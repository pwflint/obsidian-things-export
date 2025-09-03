import { Plugin, TFile, Notice, App, PluginSettingTab, Setting } from 'obsidian';
import { ThingsProjectExportSettings, DEFAULT_SETTINGS, ThingsProjectExportSettingTab } from './src/Settings';
import { NoteParser } from './src/NoteParser';
import { ThingsExporter } from './src/ThingsExporter';
import { TaskManager } from './src/TaskManager';
import { TagHandler } from './src/TagHandler';
import { LinkGenerator } from './src/LinkGenerator';

export default class ThingsProjectExportPlugin extends Plugin {
	settings: ThingsProjectExportSettings;
	noteParser: NoteParser;
	thingsExporter: ThingsExporter;
	taskManager: TaskManager;
	tagHandler: TagHandler;
	linkGenerator: LinkGenerator;
	pendingTasks: any[] = []; // Store tasks to create after project is created

	async onload() {
		await this.loadSettings();

		// Initialize core components
		this.noteParser = new NoteParser();
		this.thingsExporter = new ThingsExporter();
		this.taskManager = new TaskManager();
		this.tagHandler = new TagHandler();
		this.linkGenerator = new LinkGenerator(this.app);

		// Register protocol handlers for Things 3 callbacks (like the working plugin)
		this.registerObsidianProtocolHandler("project-id", async (id) => {
			const projectID = id['x-things-id'];
			const activeFile = this.app.workspace.getActiveFile();
			if (activeFile && projectID) {
				const thingsLink = `things:///show?id=${projectID}`;
				await this.linkGenerator.updateNoteWithLink(activeFile.path, thingsLink);
				
				// Create tasks within the project now that we have the real project ID
				if (this.pendingTasks && this.pendingTasks.length > 0) {
					for (const task of this.pendingTasks) {
						await this.thingsExporter.createTask(task, projectID);
					}
					this.pendingTasks = []; // Clear the pending tasks
				}
				
				new Notice(`Project created successfully! ID: ${projectID}`);
			}
		});

		this.registerObsidianProtocolHandler("task-id", async (id) => {
			const taskID = id['x-things-id'];
			if (taskID) {
				new Notice(`Task created successfully! ID: ${taskID}`);
			}
		});

		// Register commands
		this.addCommand({
			id: 'export-note-as-project',
			name: 'Export Note as Things Project',
			callback: () => this.exportCurrentNoteAsProject(),
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'E',
				},
			],
		});

		this.addCommand({
			id: 'export-selected-tasks',
			name: 'Export Selected Tasks',
			callback: () => this.exportSelectedTasks(),
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'T',
				},
			],
		});

		this.addCommand({
			id: 'sync-project-status',
			name: 'Sync Project Status',
			callback: () => this.syncProjectStatus(),
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'S',
				},
			],
		});

		// Add settings tab
		this.addSettingTab(new ThingsProjectExportSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async exportCurrentNoteAsProject(): Promise<void> {
		const activeFile = this.app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file found. Please open a note first.');
			return;
		}

		try {
			new Notice('Starting project export...');
			
			// Parse the note content
			const content = await this.app.vault.read(activeFile);
			const metadata = this.noteParser.parseFrontmatter(content);
			const tasks = this.taskManager.parseCheckboxes(content);
			const rawTags = this.tagHandler.extractTags(content);
			const notes = this.noteParser.extractNotes(content);

			// Convert Obsidian nested tags to Things 3 format
			// Things 3 uses grouped tags instead of forward slashes
			const convertedTags: string[] = [];
			rawTags.forEach(tag => {
				if (tag.includes('/')) {
					// Split nested tags: "people/client" -> ["people", "client"]
					const parts = tag.split('/');
					convertedTags.push(...parts);
				} else {
					// Single tag, use as-is
					convertedTags.push(tag);
				}
			});

			// Debug logging for tag conversion
			console.log('Tag conversion:', {
				rawTags: rawTags,
				convertedTags: convertedTags
			});

			// Add tags and notes to metadata for project creation
			metadata.tags = convertedTags;
			metadata.description = notes;

			// Store tasks for later creation (after project is created)
			this.pendingTasks = tasks;

			// Create Things 3 project (with tags and notes included)
			// The x-success callback will handle adding the link back to the note
			await this.thingsExporter.createProject(metadata);

			new Notice('Project export initiated! Things 3 should open shortly.');
		} catch (error) {
			console.error('Export failed:', error);
			new Notice(`Export failed: ${error.message}`);
		}
	}

	async exportSelectedTasks(): Promise<void> {
		// Implementation for exporting selected tasks only
		new Notice('Export selected tasks feature coming soon!');
	}

	async syncProjectStatus(): Promise<void> {
		// Implementation for syncing project status
		new Notice('Sync project status feature coming soon!');
	}
}

