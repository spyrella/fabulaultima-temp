import { CombatHUD } from './ui/combat-hud.mjs';
import { MetaCurrencyTrackerApplication } from './ui/metacurrency/MetaCurrencyTrackerApplication.mjs';
import { SYSTEM, FU } from './helpers/config.mjs';

export const SETTINGS = Object.freeze({
	optionQuirks: 'optionQuirks',
	optionZeroPower: 'optionZeroPower',
	optionCampingRules: 'optionCampingRules',
	optionBehaviorRoll: 'optionBehaviorRoll',
	optionTargetPriority: 'optionTargetPriority',
	optionTargetPriorityRules: 'optionTargetPriorityRules',
	collapseDescriptions: 'collapseDescriptions',
	experimentalCombatTracker: 'experimentalCombatTracker',
	optionCombatMouseDown: 'optionCombatMouseDown',
	optionDefaultTargetingMode: 'optionDefaultTargetingMode',
	optionStudySavePath: 'optionStudySavePath',
	useRevisedStudyRule: 'useRevisedStudyRule',
	optionAlwaysFavorite: 'optionAlwaysFavorite',
	optionNPCNotesTab: 'optionNPCNotesTab',
	optionBondMaxLength: 'optionBondMaxLength',
	experimentalCombatHud: 'experimentalCombatHud',
	optionCombatHudCompact: 'optionCombatHudCompact',
	optionCombatHudMinimized: 'optionCombatHudMinimized',
	optionCombatHudOpacity: 'optionCombatHudOpacity',
	optionCombatHudWidth: 'optionCombatHudWidth',
	optionCombatHudPosition: 'optionCombatHudPosition',
	optionCombatHudPortrait: 'optionCombatHudPortrait',
	optionCombatHudShowEffects: 'optionCombatHudShowEffects',
	optionCombatHudEffectsMarqueeDuration: 'optionCombatHudEffectsMarqueeDuration',
	optionCombatHudEffectsMarqueeMode: 'optionCombatHudEffectsMarqueeMode',
	optionCombatHudReordering: 'optionCombatHudReordering',
	optionCombatHudShowOrderNumbers: 'optionCombatHudShowOrderNumbers',
	optionCombatHudActorOrdering: 'optionCombatHudActorOrdering',
	optionCombatHudDraggedPosition: 'optionCombatHudDraggedPosition',
	optionCombatHudSaved: 'optionCombatHudSaved',
	optionRenameCurrency: 'optionRenameCurrency',
	metaCurrencyAutomation: 'metaCurrencyAutomation',
	metaCurrencyFabula: 'metaCurrencyFabula',
	metaCurrencyUltima: 'metaCurrencyUltima',
	metaCurrencyBaseExperience: 'metaCurrencyBaseExperience',
	metaCurrencyKeepExcessFabula: 'metaCurrencyKeepExcessFabula',
	optionCombatHudTrackedResource1: 'optionCombatHudTrackedResource1',
	optionCombatHudTrackedResource2: 'optionCombatHudTrackedResource2',
	optionCombatHudTrackedResource3: 'optionCombatHudTrackedResource3',
	showAssociatedTherioforms: 'showAssociatedTherioforms',
	checksV2: 'checksV2',
	optionCombatHudTheme: 'optionCombatHudTheme',
	optionCombatHudTrackedResource4: 'optionCombatHudTrackedResource4',
	optionCombatHudShowNPCTurnsLeftMode: 'optionCombatHudShowNPCTurnsLeftMode',
});

export const registerSystemSettings = async function () {
	game.settings.registerMenu(SYSTEM, 'myOptionalRules', {
		name: game.i18n.localize('FU.OptionalRules'),
		label: game.i18n.localize('FU.OptionalRulesManage'),
		hint: game.i18n.localize('FU.OptionalRulesSettingsInstuction'),
		icon: 'fas fa-book',
		type: OptionalRules,
		restricted: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionQuirks, {
		name: game.i18n.localize('FU.QuirksSettings'),
		hint: game.i18n.localize('FU.QuirksSettingsHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionZeroPower, {
		name: game.i18n.localize('FU.ZeroPowerSettings'),
		hint: game.i18n.localize('FU.ZeroPowerSettingsHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCampingRules, {
		name: game.i18n.localize('FU.CampingActivitiesSettings'),
		hint: game.i18n.localize('FU.CampingActivitiesSettingsHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionBehaviorRoll, {
		name: game.i18n.localize('FU.BehaviorRollsSettings'),
		hint: game.i18n.localize('FU.BehaviorRollsSettingsHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
		requiresReload: true,
	});

	game.settings.registerMenu(SYSTEM, 'myBehaviorRolls', {
		name: game.i18n.localize('FU.BehaviorRolls'),
		label: game.i18n.localize('FU.BehaviorRollsManage'),
		hint: game.i18n.localize('FU.BehaviorRollsManageHint'),
		icon: 'fas fa-book',
		type: BehaviorRollsConfig,
		restricted: true,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionTargetPriority, {
		name: game.i18n.localize('FU.TotalPartyMemberSettings'),
		hint: game.i18n.localize('FU.TotalPartyMemberSettingsHint'),
		scope: 'world',
		config: false,
		type: Number,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionTargetPriorityRules, {
		name: game.i18n.localize('FU.TotalPartyMemberRulesSettings'),
		hint: game.i18n.localize('FU.TotalPartyMemberRulesSettingsHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.collapseDescriptions, {
		name: game.i18n.localize('FU.CollapseDescriptionSettings'),
		hint: game.i18n.localize('FU.CollapseDescriptionSettingsHint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.experimentalCombatTracker, {
		name: game.i18n.localize('FU.ExperimentalCombatTracker'),
		hint: game.i18n.localize('FU.ExperimentalCombatTrackerHint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatMouseDown, {
		name: game.i18n.localize('FU.CombatHudPanTokenSettings'),
		hint: game.i18n.localize('FU.CombatHudPanTokenSettingsHint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionDefaultTargetingMode, {
		name: game.i18n.localize('FU.DefaultTargetingMode'),
		hint: game.i18n.localize('FU.DefaultTargetingModeHint'),
		scope: 'client',
		config: true,
		type: String,
		default: 'prioritizeSelected',
		choices: {
			prioritizeSelected: game.i18n.localize('FU.DefaultTargetingModePrioritizeSelected'),
			prioritizeTargeted: game.i18n.localize('FU.DefaultTargetingModePrioritizeTargeted'),
			tokenSelected: game.i18n.localize('FU.DefaultTargetingModeTokenSelected'),
			tokenTargeted: game.i18n.localize('FU.DefaultTargetingModeTokenTargeted'),
		},
	});

	game.settings.register(SYSTEM, SETTINGS.useRevisedStudyRule, {
		name: game.i18n.localize('FU.RevisedStudyRollSettings'),
		hint: game.i18n.localize('FU.RevisedStudyRollSettingsHint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionStudySavePath, {
		name: game.i18n.localize('FU.StudySavePathSettings'),
		hint: game.i18n.localize('FU.StudySavePathSettingsHint'),
		scope: 'world',
		config: true,
		type: String,
	});

	game.settings.register(SYSTEM, SETTINGS.optionAlwaysFavorite, {
		name: game.i18n.localize('FU.AlwaysFavoriteSettings'),
		hint: game.i18n.localize('FU.AlwaysFavoriteSettingsHint'),
		scope: 'client',
		config: true,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionNPCNotesTab, {
		name: game.i18n.localize('FU.NotesTabSettings'),
		hint: game.i18n.localize('FU.NotesTabSettingsHint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionBondMaxLength, {
		name: game.i18n.localize('FU.BondMax'),
		hint: game.i18n.localize('FU.BondMaxHint'),
		scope: 'world',
		config: true,
		type: Number,
		default: 6,
		requiresReload: true,
	});

	game.settings.registerMenu(SYSTEM, 'combatHudSettings', {
		name: game.i18n.localize('FU.ExperimentalCombatHudSettings'),
		hint: game.i18n.localize('FU.ExperimentalCombatHudSettingsHint'),
		label: game.i18n.localize('FU.ExperimentalCombatHudSettingsLabel'),
		scope: 'client',
		icon: 'fas fa-book',
		type: CombatHudSettings,
	});

	game.settings.register(SYSTEM, SETTINGS.experimentalCombatHud, {
		name: game.i18n.localize('FU.ExperimentalCombatHud'),
		hint: game.i18n.localize('FU.ExperimentalCombatHudHint'),
		scope: 'client',
		config: false,
		type: Boolean,
		default: false,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudOpacity, {
		name: game.i18n.localize('FU.CombatHudOpacity'),
		hint: game.i18n.localize('FU.CombatHudOpacityHint'),
		scope: 'client',
		config: false,
		type: Number,
		default: 100,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudWidth, {
		name: game.i18n.localize('FU.CombatHudWidth'),
		hint: game.i18n.localize('FU.CombatHudWidthHint'),
		scope: 'client',
		config: false,
		type: Number,
		default: 100,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudPosition, {
		name: game.i18n.localize('FU.CombatHudPosition'),
		hint: game.i18n.localize('FU.CombatHudPositionHint'),
		scope: 'client',
		config: false,
		type: String,
		default: 'bottom',
		choices: {
			bottom: game.i18n.localize('FU.CombatHudPositionBottom'),
			top: game.i18n.localize('FU.CombatHudPositionTop'),
		},
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudPortrait, {
		name: game.i18n.localize('FU.CombatHudPortrait'),
		hint: game.i18n.localize('FU.CombatHudPortraitHint'),
		scope: 'client',
		config: false,
		type: String,
		default: 'actor',
		choices: {
			actor: game.i18n.localize('FU.CombatHudPortraitActor'),
			token: game.i18n.localize('FU.CombatHudPortraitToken'),
		},
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudCompact, {
		name: 'CombatHudCompact',
		scope: 'client',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudMinimized, {
		name: 'CombatHudMinimized',
		scope: 'client',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudSaved, {
		name: 'CombatHudSaved',
		scope: 'client',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudShowEffects, {
		name: game.i18n.localize('FU.CombatHudShowEffects'),
		hint: game.i18n.localize('FU.CombatHudShowEffectsHint'),
		scope: 'client',
		config: false,
		type: Boolean,
		default: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeDuration, {
		name: game.i18n.localize('FU.CombatHudEffectsMarqueeDuration'),
		hint: game.i18n.localize('FU.CombatHudEffectsMarqueeDurationHint'),
		scope: 'client',
		config: false,
		type: Number,
		default: 15,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeMode, {
		name: game.i18n.localize('FU.CombatHudEffectsMarqueeMode'),
		hint: game.i18n.localize('FU.CombatHudEffectsMarqueeModeHint'),
		scope: 'client',
		config: false,
		type: String,
		default: 'alternate',
		choices: {
			normal: game.i18n.localize('FU.CombatHudEffectsMarqueeModeNormal'),
			alternate: game.i18n.localize('FU.CombatHudEffectsMarqueeModeAlternate'),
		},
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudReordering, {
		name: game.i18n.localize('FU.CombatHudReordering'),
		hint: game.i18n.localize('FU.CombatHudReorderingHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
		restricted: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudShowOrderNumbers, {
		name: game.i18n.localize('FU.CombatHudShowOrderNumbers'),
		hint: game.i18n.localize('FU.CombatHudShowOrderNumbersHint'),
		scope: 'client',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudActorOrdering, {
		name: game.i18n.localize('FU.CombatHudActorOrdering'),
		hint: game.i18n.localize('FU.CombatHudActorOrderingHint'),
		scope: 'world',
		config: false,
		type: Array,
		default: [],
		restricted: true,
		onChange: () => {
			CombatHUD.update();
		},
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudDraggedPosition, {
		name: game.i18n.localize('FU.CombatHudDraggedPosition'),
		hint: game.i18n.localize('FU.CombatHudDraggedPositionHint'),
		scope: 'client',
		config: false,
		type: Object,
		default: {},
	});

	game.settings.register(SYSTEM, SETTINGS.optionRenameCurrency, {
		name: game.i18n.localize('FU.RenameCurrency'),
		hint: game.i18n.localize('FU.RenameCurrencyHint'),
		scope: 'world',
		config: true,
		type: String,
		default: 'Zenit',
	});

	game.settings.register(SYSTEM, SETTINGS.metaCurrencyFabula, {
		name: 'Count used Fabula Points',
		scope: 'world',
		config: false,
		type: Number,
		range: {
			min: 0,
			step: 1,
		},
		default: 0,
		onChange: () => Hooks.callAll(MetaCurrencyTrackerApplication.HOOK_UPDATE_META_CURRENCY),
	});

	game.settings.register(SYSTEM, SETTINGS.metaCurrencyUltima, {
		name: 'Count used Ultima Points',
		scope: 'world',
		config: false,
		type: Number,
		range: {
			min: 0,
			step: 1,
		},
		default: 0,
		onChange: () => Hooks.callAll(MetaCurrencyTrackerApplication.HOOK_UPDATE_META_CURRENCY),
	});

	game.settings.registerMenu(SYSTEM, 'metaCurrencySettings', {
		name: game.i18n.localize('FU.ConfigMetaCurrencySettings'),
		hint: game.i18n.localize('FU.ConfigMetaCurrencySettingsHint'),
		label: game.i18n.localize('FU.ConfigMetaCurrencySettingsLabel'),
		icon: 'fas fa-chart-line',
		type: MetaCurrencyTrackerOptions,
		restricted: true,
	});

	game.settings.register(SYSTEM, SETTINGS.metaCurrencyAutomation, {
		name: game.i18n.localize('FU.ConfigMetaCurrencyAutomation'),
		hint: game.i18n.localize('FU.ConfigMetaCurrencyAutomationHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: true,
	});

	game.settings.register(SYSTEM, SETTINGS.metaCurrencyBaseExperience, {
		name: game.i18n.localize('FU.ConfigMetaCurrencyBaseExperience'),
		hint: game.i18n.localize('FU.ConfigMetaCurrencyBaseExperienceHint'),
		scope: 'world',
		config: false,
		type: Number,
		range: {
			min: 0,
			step: 1,
		},
		default: 5,
	});

	game.settings.register(SYSTEM, SETTINGS.metaCurrencyKeepExcessFabula, {
		name: game.i18n.localize('FU.ConfigMetaCurrencyKeepExcessFabula'),
		hint: game.i18n.localize('FU.ConfigMetaCurrencyKeepExcessFabulaHint'),
		scope: 'world',
		config: false,
		type: Boolean,
		default: false,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudTrackedResource1, {
		name: game.i18n.localize('FU.CombatHudTrackedResource1'),
		hint: game.i18n.localize('FU.CombatHudTrackedResource1Hint'),
		scope: 'world',
		config: false,
		type: String,
		choices: FU.combatHudResources,
		default: 'hp',
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudTrackedResource2, {
		name: game.i18n.localize('FU.CombatHudTrackedResource2'),
		hint: game.i18n.localize('FU.CombatHudTrackedResource2Hint'),
		scope: 'world',
		config: false,
		type: String,
		choices: FU.combatHudResources,
		default: 'mp',
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudTrackedResource3, {
		name: game.i18n.localize('FU.CombatHudTrackedResource3'),
		hint: game.i18n.localize('FU.CombatHudTrackedResource3Hint'),
		scope: 'world',
		config: false,
		type: String,
		choices: FU.combatHudResources,
		default: 'ip',
	});

	game.settings.register(SYSTEM, SETTINGS.showAssociatedTherioforms, {
		name: game.i18n.localize('FU.ClassFeatureTherioformOptionShowAssociatedTherioformsName'),
		hint: game.i18n.localize('FU.ClassFeatureTherioformOptionShowAssociatedTherioformsHint'),
		scope: 'client',
		config: true,
		type: Boolean,
		default: true,
	});

	game.settings.register(SYSTEM, SETTINGS.checksV2, {
		name: game.i18n.localize('FU.SettingChecksV2'),
		hint: game.i18n.localize('FU.SettingChecksV2Hint'),
		config: true,
		type: Boolean,
		default: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudTheme, {
		name: game.i18n.localize('FU.CombatHudTheme'),
		hint: game.i18n.localize('FU.CombatHudThemeHint'),
		scope: 'world',
		config: false,
		type: String,
		default: 'fu-default',
		choices: FU.combatHudThemes,
		requiresReload: true,
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudTrackedResource4, {
		name: game.i18n.localize('FU.CombatHudTrackedResource4'),
		hint: game.i18n.localize('FU.CombatHudTrackedResource4Hint'),
		scope: 'world',
		config: false,
		type: String,
		choices: FU.combatHudResources,
		default: 'none',
	});

	game.settings.register(SYSTEM, SETTINGS.optionCombatHudShowNPCTurnsLeftMode, {
		name: game.i18n.localize('FU.CombatHudShowNPCTurnsLeftMode'),
		hint: game.i18n.localize('FU.CombatHudShowNPCTurnsLeftModeHint'),
		scope: 'world',
		config: false,
		type: String,
		default: 'only-studied',
		choices: {
			never: game.i18n.localize('FU.CombatHudShowNPCTurnsLeftModeNever'),
			always: game.i18n.localize('FU.CombatHudShowNPCTurnsLeftModeAlways'),
			'only-studied': game.i18n.localize('FU.CombatHudShowNPCTurnsLeftModeOnlyStudied'),
		},
	});
};

class OptionalRules extends FormApplication {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: 'systems/projectfu/templates/system/settings/optional-rules.hbs',
		});
	}

	getData() {
		return {
			optionQuirks: game.settings.get(SYSTEM, SETTINGS.optionQuirks),
			optionZeroPower: game.settings.get(SYSTEM, SETTINGS.optionZeroPower),
			optionCampingRules: game.settings.get(SYSTEM, SETTINGS.optionCampingRules),
		};
	}

	async _updateObject(event, formData) {
		const { optionQuirks, optionZeroPower, optionCampingRules } = foundry.utils.expandObject(formData);
		game.settings.set(SYSTEM, SETTINGS.optionQuirks, optionQuirks);
		game.settings.set(SYSTEM, SETTINGS.optionZeroPower, optionZeroPower);
		game.settings.set(SYSTEM, SETTINGS.optionCampingRules, optionCampingRules);
	}
}

class BehaviorRollsConfig extends FormApplication {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: 'systems/projectfu/templates/system/settings/behavior-rolls.hbs',
		});
	}

	getData() {
		return {
			optionBehaviorRoll: game.settings.get(SYSTEM, SETTINGS.optionBehaviorRoll),
			optionTargetPriority: game.settings.get(SYSTEM, SETTINGS.optionTargetPriority),
			optionTargetPriorityRules: game.settings.get(SYSTEM, SETTINGS.optionTargetPriorityRules),
		};
	}

	async _updateObject(event, formData) {
		const { optionBehaviorRoll, optionTargetPriority, optionTargetPriorityRules } = foundry.utils.expandObject(formData);
		game.settings.set(SYSTEM, SETTINGS.optionBehaviorRoll, optionBehaviorRoll);
		game.settings.set(SYSTEM, SETTINGS.optionTargetPriority, optionTargetPriority);
		game.settings.set(SYSTEM, SETTINGS.optionTargetPriorityRules, optionTargetPriorityRules);
	}
}

class CombatHudSettings extends FormApplication {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: 'systems/projectfu/templates/system/settings/combat-hud.hbs',
		});
	}

	getData() {
		return {
			experimentalCombatHud: game.settings.get(SYSTEM, SETTINGS.experimentalCombatHud),
			optionCombatHudOpacity: game.settings.get(SYSTEM, SETTINGS.optionCombatHudOpacity),
			optionCombatHudWidth: game.settings.get(SYSTEM, SETTINGS.optionCombatHudWidth),
			optionCombatHudPosition: game.settings.get(SYSTEM, SETTINGS.optionCombatHudPosition),
			optionCombatHudPositionOptions: { bottom: 'FU.CombatHudPositionBottom', top: 'FU.CombatHudPositionTop' },
			optionCombatHudPortrait: game.settings.get(SYSTEM, SETTINGS.optionCombatHudPortrait),
			optionCombatHudPortraitOptions: { actor: 'FU.CombatHudPortraitActor', token: 'FU.CombatHudPortraitToken' },
			optionCombatHudShowEffects: game.settings.get(SYSTEM, SETTINGS.optionCombatHudShowEffects),
			optionCombatHudEffectsMarqueeDuration: game.settings.get(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeDuration),
			optionCombatHudEffectsMarqueeMode: game.settings.get(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeMode),
			optionCombatHudEffectsMarqueeModeOptions: { normal: 'FU.CombatHudEffectsMarqueeModeNormal', alternate: 'FU.CombatHudEffectsMarqueeModeAlternate' },
			optionCombatHudReordering: game.settings.get(SYSTEM, SETTINGS.optionCombatHudReordering),
			optionCombatHudShowOrderNumbers: game.settings.get(SYSTEM, SETTINGS.optionCombatHudShowOrderNumbers),
			isGM: game.user.isGM,
			optionCombatHudTrackedResource1: game.settings.get(SYSTEM, SETTINGS.optionCombatHudTrackedResource1),
			optionCombatHudTrackedResource2: game.settings.get(SYSTEM, SETTINGS.optionCombatHudTrackedResource2),
			optionCombatHudTrackedResource3: game.settings.get(SYSTEM, SETTINGS.optionCombatHudTrackedResource3),
			optionCombatHudTrackedResource4: game.settings.get(SYSTEM, SETTINGS.optionCombatHudTrackedResource4),
			trackedResources: FU.combatHudResources,
			optionCombatHudTheme: game.settings.get(SYSTEM, SETTINGS.optionCombatHudTheme),
			optionCombatHudThemeOptions: FU.combatHudThemes,
			optionCombatHudShowNPCTurnsLeftMode: game.settings.get(SYSTEM, SETTINGS.optionCombatHudShowNPCTurnsLeftMode),
			optionCombatHudShowNPCTurnsLeftModeOptions: {
				never: 'FU.CombatHudShowNPCTurnsLeftModeNever',
				always: 'FU.CombatHudShowNPCTurnsLeftModeAlways',
				'only-studied': 'FU.CombatHudShowNPCTurnsLeftModeOnlyStudied',
			},
		};
	}

	async _updateObject(event, formData) {
		if (game.user.isGM) {
			const {
				experimentalCombatHud,
				optionCombatHudOpacity,
				optionCombatHudWidth,
				optionCombatHudPosition,
				optionCombatHudPortrait,
				optionCombatHudShowEffects,
				optionCombatHudEffectsMarqueeDuration,
				optionCombatHudEffectsMarqueeMode,
				optionCombatHudReordering,
				optionCombatHudShowOrderNumbers,
				optionCombatHudTrackedResource1,
				optionCombatHudTrackedResource2,
				optionCombatHudTrackedResource3,
				optionCombatHudTrackedResource4,
				optionCombatHudTheme,
				optionCombatHudShowNPCTurnsLeftMode,
			} = foundry.utils.expandObject(formData);

			game.settings.set(SYSTEM, SETTINGS.experimentalCombatHud, experimentalCombatHud);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudOpacity, optionCombatHudOpacity);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudWidth, optionCombatHudWidth);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudPosition, optionCombatHudPosition);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudPortrait, optionCombatHudPortrait);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudShowEffects, optionCombatHudShowEffects);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeDuration, optionCombatHudEffectsMarqueeDuration);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeMode, optionCombatHudEffectsMarqueeMode);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudReordering, optionCombatHudReordering);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudShowOrderNumbers, optionCombatHudShowOrderNumbers);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudTrackedResource1, optionCombatHudTrackedResource1);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudTrackedResource2, optionCombatHudTrackedResource2);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudTrackedResource3, optionCombatHudTrackedResource3);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudTrackedResource4, optionCombatHudTrackedResource4);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudTheme, optionCombatHudTheme);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudShowNPCTurnsLeftMode, optionCombatHudShowNPCTurnsLeftMode);
		} else {
			const {
				experimentalCombatHud,
				optionCombatHudOpacity,
				optionCombatHudWidth,
				optionCombatHudPosition,
				optionCombatHudPortrait,
				optionCombatHudShowEffects,
				optionCombatHudEffectsMarqueeDuration,
				optionCombatHudEffectsMarqueeMode,
				optionCombatHudShowOrderNumbers,
			} = foundry.utils.expandObject(formData);

			game.settings.set(SYSTEM, SETTINGS.experimentalCombatHud, experimentalCombatHud);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudOpacity, optionCombatHudOpacity);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudWidth, optionCombatHudWidth);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudPosition, optionCombatHudPosition);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudPortrait, optionCombatHudPortrait);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudShowEffects, optionCombatHudShowEffects);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeDuration, optionCombatHudEffectsMarqueeDuration);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudEffectsMarqueeMode, optionCombatHudEffectsMarqueeMode);
			game.settings.set(SYSTEM, SETTINGS.optionCombatHudShowOrderNumbers, optionCombatHudShowOrderNumbers);
		}

		const isCustomTrackerActive = game.settings.get(SYSTEM, SETTINGS.experimentalCombatTracker);
		if (!isCustomTrackerActive && formData.experimentalCombatHud) {
			const enableTracker = await Dialog.confirm({
				title: game.i18n.localize('FU.ExperimentalCombatHudWarningNoCombatTrackerTitle'),
				content: game.i18n.localize('FU.ExperimentalCombatHudWarningNoCombatTrackerContent'),
			});

			if (enableTracker) {
				game.settings.set(SYSTEM, SETTINGS.experimentalCombatTracker, true);
			}
		}

		await SettingsConfig.reloadConfirm({ world: game.user.isGM });
	}
}

class MetaCurrencyTrackerOptions extends FormApplication {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			title: game.i18n.localize('FU.ConfigMetaCurrencySettings'),
			width: 700,
		});
	}

	get template() {
		return 'systems/projectfu/templates/system/settings/meta-currency.hbs';
	}

	getData(options = {}) {
		return {
			baseExperience: game.settings.get(SYSTEM, SETTINGS.metaCurrencyBaseExperience),
			keepExcessFabula: game.settings.get(SYSTEM, SETTINGS.metaCurrencyKeepExcessFabula),
			automation: game.settings.get(SYSTEM, SETTINGS.metaCurrencyAutomation),
		};
	}

	async _updateObject(event, formData) {
		const { baseExperience, keepExcessFabula, automation } = foundry.utils.expandObject(formData);
		game.settings.set(SYSTEM, SETTINGS.metaCurrencyBaseExperience, baseExperience);
		game.settings.set(SYSTEM, SETTINGS.metaCurrencyKeepExcessFabula, keepExcessFabula);
		game.settings.set(SYSTEM, SETTINGS.metaCurrencyAutomation, automation);
	}
}
