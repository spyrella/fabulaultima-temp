/**
 * @typedef CheckAttributes
 * @property {Attribute} primary
 * @property {Attribute} secondary
 */

import { CheckHooks } from './check-hooks.mjs';
import { FU, SYSTEM } from '../helpers/config.mjs';
import { Flags } from '../helpers/flags.mjs';
import { AttributeCheck } from './attribute-check.mjs';
import { CheckPush } from './check-push.mjs';
import { CheckReroll } from './check-reroll.mjs';
import { AccuracyCheck } from './accuracy-check.mjs';
import { MagicCheck } from './magic-check.mjs';
import { SpecialResults } from './special-results.mjs';
import { Support } from './support/support.mjs';
import { OpenCheck } from './open-check.mjs';
import { OpposedCheck } from './opposed-check.mjs';

/**
 * @param {FUActor} actor
 * @param {FUItem} item
 * @param {CheckCallback} [configCallback]
 */
const accuracyCheck = async (actor, item, configCallback) => {
	const check = {
		type: 'accuracy',
	};
	return performCheck(check, actor, item, configCallback);
};

/**
 *
 * @param {FUActor} actor
 * @param {CheckAttributes} attributes
 * @param {CheckCallback} [configCallback]
 */
const attributeCheck = async (actor, attributes, configCallback) => {
	/** @type Partial<Check> */
	const check = {
		type: 'attribute',
		primary: attributes.primary,
		secondary: attributes.secondary,
	};

	return performCheck(check, actor, undefined, configCallback);
};

/**
 * @param {FUActor} actor
 * @param {CheckAttributes | CheckId} attributesOrId
 * @param {CheckCallback} [configCallback]
 */
const groupCheck = async (actor, attributesOrId, configCallback) => {
	throw new Error('Not yet implemented');
};

/**
 * @param {FUActor} actor
 * @param {FUItem} item
 * @param {CheckCallback} [configCallback]
 */
const magicCheck = async (actor, item, configCallback) => {
	const check = {
		type: 'magic',
	};
	return performCheck(check, actor, item, configCallback);
};

/**
 * @param {FUActor} actor
 * @param {CheckAttributes} attributes
 * @param {CheckCallback} [configCallback]
 */
const openCheck = async (actor, attributes, configCallback) => {
	/** @type Partial<Check> */
	const check = {
		type: 'open',
		primary: attributes.primary,
		secondary: attributes.secondary,
	};

	return performCheck(check, actor, undefined, configCallback);
};

/**
 * @param {FUActor} actor
 * @param {CheckCallback} configCallback
 */
const opposedCheck = async (actor, configCallback) => {
	/** @type Partial<Check> */
	const check = {
		type: 'opposed',
	};

	return performCheck(check, actor, undefined, configCallback);
};

/**
 * @param actor
 * @param {CheckId} groupCheckId
 */
const supportCheck = async (actor, groupCheckId) => {
	throw new Error('Not yet implemented');
};

/**
 * @param {CheckResultV2} check
 * @return {Check}
 */
const checkFromCheckResult = (check) => {
	return {
		id: foundry.utils.randomID(),
		type: check.type,
		primary: check.primary.attribute,
		secondary: check.secondary.attribute,
		modifiers: check.modifiers,
		additionalData: { ...check.additionalData },
	};
};

/**
 * @callback CheckModificationCallback
 * @param {CheckResultV2} check
 * @param {FUActor} actor
 * @param {FUItem} item
 * @return {Promise<{[roll]: Roll, [check]: Check} | null>}
 */
/**
 * @param {CheckId} checkId
 * @param {CheckModificationCallback} callback
 * @return {Promise<void>}
 */
const modifyCheck = async (checkId, callback) => {
	const message = game.messages.search({ filters: [{ field: 'flags.projectfu.CheckV2.id', value: checkId }] }).at(0);
	if (message) {
		/** @type CheckResultV2 */
		const oldResult = foundry.utils.duplicate(message.getFlag(SYSTEM, Flags.ChatMessage.CheckV2));
		const actor = await fromUuid(oldResult.actorUuid);
		const item = await fromUuid(oldResult.itemUuid);
		const callbackResult = await callback(oldResult, actor, item);
		if (callbackResult) {
			const { check = checkFromCheckResult(oldResult), roll = oldResult.roll } = callbackResult;
			const result = await processResult(check, roll, actor, item);
			return renderCheck(result, actor, item, message.flags);
		}
	}
};

/**
 * @param {Partial<Check>} check
 * @param {FUActor} actor
 * @param {FUItem} item
 * @param {CheckCallback} initialConfigCallback
 * @return {Promise<Check>}
 */
async function prepareCheck(check, actor, item, initialConfigCallback) {
	check.primary ??= '';
	check.secondary ??= '';
	check.id ??= foundry.utils.randomID();
	check.modifiers ??= [];
	check.additionalData ??= {};
	Object.seal(check);
	await (initialConfigCallback ? initialConfigCallback(check) : undefined);
	Object.defineProperty(check, 'type', {
		value: check.type,
		writable: false,
		enumerable: true,
	});
	if (!check.type) {
		throw new Error('check type missing');
	}
	Object.defineProperty(check, 'id', {
		value: check.id,
		writable: false,
		configurable: false,
		enumerable: true,
	});
	if (!check.id) {
		throw new Error('check id missing');
	}

	/**
	 * @type {{callback: Promise | (() => Promise | void), priority: number}[]}
	 */
	const callbacks = [];
	const registerCallbacks = (callback, priority = 0) => {
		callbacks.push({ callback, priority });
	};

	Hooks.callAll(CheckHooks.prepareCheck, check, actor, item, registerCallbacks);

	callbacks.sort((a, b) => a.priority - b.priority);
	for (let callbackObj of callbacks) {
		await callbackObj.callback(check);
	}

	if (!check.primary || !check.secondary) {
		throw new Error('check attribute missing');
	}

	return check;
}

const CRITICAL_THRESHOLD = 6;

/**
 * @param {Check} check
 * @param {FUActor} actor
 * @param {FUItem} item
 * @return {Promise<Roll>}
 */
async function rollCheck(check, actor, item) {
	const { primary, secondary, modifiers } = check;
	/** @type AttributesDataModel */
	const attributes = actor.system.attributes;
	const primaryDice = attributes[primary].current;
	const secondaryDice = attributes[secondary].current;

	const modifierTotal = modifiers.reduce((agg, curr) => (agg += curr.value), 0);
	let modPart = '';
	if (modifierTotal > 0) {
		modPart = ` + ${modifierTotal}`;
	} else if (modifierTotal < 0) {
		modPart = ` - ${Math.abs(modifierTotal)}`;
	}
	const formula = `d${primaryDice}[${primary}] + d${secondaryDice}[${secondary}]${modPart}`;

	return new Roll(formula).roll();
}

/**
 * @param {RollTerm} term
 * @param {FUActor} actor
 * @return {{result: number, dice: number}}
 */
const extractDieResults = (term, actor) => {
	const DiceTermClass = foundry.utils.isNewerVersion(game.version, '12.0.0') ? foundry.dice.terms.DiceTerm : DiceTerm;
	const NumericTermClass = foundry.utils.isNewerVersion(game.version, '12.0.0') ? foundry.dice.terms.NumericTerm : NumericTerm;
	if (term instanceof DiceTermClass) {
		return {
			dice: term.faces,
			result: term.total,
		};
	} else if (term instanceof NumericTermClass) {
		return {
			dice: term.options.faces ?? actor.system.attributes[term.flavor].current,
			result: term.total,
		};
	} else {
		throw new Error(`Unexpected formula term for primary attribute: ${term}`);
	}
};

/**
 * @param {Check} check
 * @param {Roll} roll
 * @param {FUActor} actor
 * @param {FUItem} item
 * @return {Promise<Readonly<CheckResultV2>>}
 */
const processResult = async (check, roll, actor, item) => {
	if (!roll._evaluated) {
		await roll.roll();
	}

	const primary = extractDieResults(roll.terms[0], actor);

	const secondary = extractDieResults(roll.terms[2], actor);

	/**
	 * @type {Readonly<CheckResultV2>}
	 */
	const result = Object.freeze({
		type: check.type,
		id: check.id,
		actorUuid: actor.uuid,
		itemUuid: item?.uuid,
		roll: roll.toJSON(),
		additionalRolls: [],
		primary: Object.freeze({
			attribute: check.primary,
			dice: primary.dice,
			result: primary.result,
		}),
		secondary: Object.freeze({
			attribute: check.secondary,
			dice: secondary.dice,
			result: secondary.result,
		}),
		modifiers: Object.freeze(check.modifiers.map(Object.freeze)),
		modifierTotal: check.modifiers.reduce((agg, curr) => agg + curr.value, 0),
		result: roll.total,
		fumble: primary.result === 1 && secondary.result === 1,
		critical: primary.result === secondary.result && primary.result >= CRITICAL_THRESHOLD,
		additionalData: check.additionalData,
	});

	Hooks.callAll(CheckHooks.processCheck, result, actor, item);

	return result;
};

/**
 * @param {CheckResultV2} result
 * @param {FUActor} actor
 * @param {FUItem} item
 * @param {Record<string, any>} [flags]
 * @return {Promise<void>}
 */
async function renderCheck(result, actor, item, flags = {}) {
	/**
	 * @type {CheckRenderData}
	 */
	const renderData = [];
	const additionalFlags = {};

	Hooks.callAll(CheckHooks.renderCheck, renderData, result, actor, item, additionalFlags);

	/**
	 * @type {CheckSection[]}
	 */
	const sections = [];
	for (let value of renderData) {
		value = await (value instanceof Function ? value() : value);
		if (value) {
			sections.push(value);
		}
	}

	sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

	const flavor = item
		? await renderTemplate('systems/projectfu/templates/chat/chat-check-flavor-item.hbs', {
				name: item.name,
				img: item.img,
				id: item.id,
			})
		: await renderTemplate('systems/projectfu/templates/chat/chat-check-flavor-check.hbs', {
				title: FU.checkTypes[result.type] || 'FU.RollCheck',
			});

	const rolls = [result.roll, ...result.additionalRolls].filter(Boolean);

	const chatMessage = {
		flavor: flavor,
		content: await renderTemplate('systems/projectfu/templates/chat/chat-checkV2.hbs', { sections }),
		rolls: rolls,
		type: foundry.utils.isNewerVersion(game.version, '12.0.0') ? undefined : CONST.CHAT_MESSAGE_TYPES.ROLL,
		speaker: ChatMessage.getSpeaker({ actor }),
		flags: foundry.utils.mergeObject(
			{
				[SYSTEM]: {
					[Flags.ChatMessage.CheckV2]: result,
				},
			},
			foundry.utils.mergeObject(additionalFlags, flags, { overwrite: false }),
			{ overwrite: false, recursive: true },
		),
	};
	const message = await ChatMessage.create(chatMessage);

	setupItemImageClicks(message.id, actor);
}

/**
 * Add click listeners to item images in the chat message.
 * @param {string} messageId - The ID of the chat message.
 * @param {FUActor} actor - The actor containing the items.
 */
function setupItemImageClicks(messageId, actor) {
	// Use event delegation to handle clicks on dynamically added items
	document.addEventListener('click', function (event) {
		if (event.target.classList.contains('item-img')) {
			const img = event.target;
			const itemId = img.getAttribute('data-item-id');
			if (actor) {
				const item = actor.items.get(itemId);
				if (item) {
					item.sheet.render(true);
				}
			}
		}
	});
}

/**
 * Reapply event listeners when new chat messages are added to the DOM.
 */
function reapplyClickListeners() {
	Hooks.on('renderChatMessage', (message) => {
		// Reapply event listeners for each chat message
		setupItemImageClicks(message.id, game.actors.get(message.speaker.actor));
	});
}

// Initialize click listeners
reapplyClickListeners();

/**
 * @param {Partial<Check>} check
 * @param {FUActor} actor
 * @param {FUItem} item
 * @param {CheckCallback} [initialConfigCallback]
 */
const performCheck = async (check, actor, item, initialConfigCallback = undefined) => {
	const preparedCheck = await prepareCheck(check, actor, item, initialConfigCallback);
	const roll = await rollCheck(preparedCheck, actor, item);
	const result = await processResult(preparedCheck, roll, actor, item);
	return await renderCheck(result, actor, item);
};

/**
 * @param {FUActor} actor
 * @param {FUItem} item
 * @return {Promise<void>}
 */
const display = async (actor, item) => {
	/** @type CheckResultV2 */
	const check = Object.freeze({
		type: 'display',
		id: foundry.utils.randomID(),
		actorUuid: actor.uuid,
		itemUuid: item?.uuid,
		roll: null,
		additionalRolls: [],
		primary: null,
		secondary: null,
		modifiers: null,
		modifierTotal: null,
		result: null,
		fumble: null,
		critical: null,
		additionalData: {},
	});
	Hooks.callAll(CheckHooks.processCheck, check, actor, item);
	await renderCheck(check, actor, item);
};

/**
 * @param {ChatMessage | string} message a ChatMessage or ID of a ChatMessage
 * @param {CheckType | CheckType[]} [type]
 * @return boolean
 */
const isCheck = (message, type) => {
	if (typeof message === 'string') {
		message = game.messages.get(message);
	}
	if (message instanceof ChatMessage) {
		/** @type CheckResultV2 */
		const flag = message.getFlag(SYSTEM, Flags.ChatMessage.CheckV2);
		if (flag) {
			if (type) {
				if (Array.isArray(type)) {
					return type.includes(flag.type);
				} else {
					return type === flag.type;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	return false;
};

export const ChecksV2 = Object.freeze({
	display,
	accuracyCheck,
	attributeCheck,
	groupCheck,
	magicCheck,
	openCheck,
	opposedCheck,
	supportCheck,
	modifyCheck,
	isCheck,
});

CheckPush.initialize();
CheckReroll.initialize();
SpecialResults.initialize();
AccuracyCheck.initialize();
AttributeCheck.initialize();
MagicCheck.initialize();
OpenCheck.initialize();
OpposedCheck.initialize();
Support.initialize();
