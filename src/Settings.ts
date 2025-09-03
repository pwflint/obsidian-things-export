import { PluginSettingTab, Setting, App } from 'obsidian';

export interface ThingsProjectExportSettings {
	defaultProjectArea: string;
	tagMapping: string[];
	dateFormat: string;
	autoSync: boolean;
	includeNotes: boolean;
	createTags: boolean;
	preserveFormatting: boolean;
}

export const DEFAULT_SETTINGS: ThingsProjectExportSettings = {
	defaultProjectArea: '',
	tagMapping: [],
	dateFormat: 'YYYY-MM-DD',
	autoSync: false,
	includeNotes: true,
	createTags: true,
	preserveFormatting: true,
};

export class ThingsProjectExportSettingTab extends PluginSettingTab {
	plugin: any; // Will be typed properly when imported

	constructor(app: App, plugin: any) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Things 3 Project Export Settings' });

		// Default project area setting
		new Setting(containerEl)
			.setName('Default Project Area')
			.setDesc('The default area in Things 3 where new projects will be created')
			.addText(text => text
				.setPlaceholder('Enter area name')
				.setValue(this.plugin.settings.defaultProjectArea)
				.onChange(async (value) => {
					this.plugin.settings.defaultProjectArea = value;
					await this.plugin.saveSettings();
				}));

		// Tag mapping setting
		new Setting(containerEl)
			.setName('Tag Mapping')
			.setDesc('Map Obsidian tags to Things 3 tags (one per line, format: obsidian:things)')
			.addTextArea(text => text
				.setPlaceholder('obsidian-tag:things-tag')
				.setValue(this.plugin.settings.tagMapping.join('\n'))
				.onChange(async (value) => {
					this.plugin.settings.tagMapping = value.split('\n').filter(line => line.trim());
					await this.plugin.saveSettings();
				}));

		// Date format setting
		new Setting(containerEl)
			.setName('Date Format')
			.setDesc('Date format for parsing dates from frontmatter')
			.addText(text => text
				.setPlaceholder('YYYY-MM-DD')
				.setValue(this.plugin.settings.dateFormat)
				.onChange(async (value) => {
					this.plugin.settings.dateFormat = value;
					await this.plugin.saveSettings();
				}));

		// Auto-sync setting
		new Setting(containerEl)
			.setName('Auto-sync on save')
			.setDesc('Automatically sync changes to Things 3 when the note is saved')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoSync)
				.onChange(async (value) => {
					this.plugin.settings.autoSync = value;
					await this.plugin.saveSettings();
				}));

		// Include notes setting
		new Setting(containerEl)
			.setName('Include Notes')
			.setDesc('Include note content as project notes in Things 3')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.includeNotes)
				.onChange(async (value) => {
					this.plugin.settings.includeNotes = value;
					await this.plugin.saveSettings();
				}));

		// Create tags setting
		new Setting(containerEl)
			.setName('Create Tags')
			.setDesc('Automatically create new tags in Things 3 if they don\'t exist')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.createTags)
				.onChange(async (value) => {
					this.plugin.settings.createTags = value;
					await this.plugin.saveSettings();
				}));

		// Preserve formatting setting
		new Setting(containerEl)
			.setName('Preserve Formatting')
			.setDesc('Preserve markdown formatting when exporting to Things 3')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preserveFormatting)
				.onChange(async (value) => {
					this.plugin.settings.preserveFormatting = value;
					await this.plugin.saveSettings();
				}));
	}
}