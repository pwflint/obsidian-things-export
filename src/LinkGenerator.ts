import { App, TFile } from 'obsidian';

export class LinkGenerator {
	private app: App;

	constructor(app: App) {
		this.app = app;
	}

	/**
	 * Create a Things 3 deep link
	 */
	createThingsLink(type: 'project' | 'task', id: string): string {
		return `things:///show?id=${id}`;
	}

	/**
	 * Create an Obsidian link to a note
	 */
	createObsidianLink(notePath: string): string {
		return `obsidian://open?vault=${encodeURIComponent(this.app.vault.getName())}&file=${encodeURIComponent(notePath)}`;
	}

	/**
	 * Update a note with a Things 3 link
	 */
	async updateNoteWithLink(notePath: string, thingsLink: string): Promise<void> {
		try {
			const file = this.app.vault.getAbstractFileByPath(notePath) as TFile;
			if (!file) {
				throw new Error(`File not found: ${notePath}`);
			}

			const content = await this.app.vault.read(file);
			const updatedContent = this.addThingsLinkToContent(content, thingsLink);
			
			await this.app.vault.modify(file, updatedContent);
		} catch (error) {
			console.error('Failed to update note with Things link:', error);
			throw error;
		}
	}

	/**
	 * Add Things 3 link to note content
	 */
	private addThingsLinkToContent(content: string, thingsLink: string): string {
		// Check if Things link already exists
		if (content.includes('[Things](') || content.includes('things://')) {
			// Replace existing Things link
			const thingsLinkRegex = /\[Things\]\([^)]+\)/g;
			return content.replace(thingsLinkRegex, `[Things](${thingsLink})`);
		}

		// Add new Things link after frontmatter or at the beginning
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
		const match = content.match(frontmatterRegex);
		
		if (match) {
			// Add after frontmatter
			const afterFrontmatter = content.substring(match[0].length);
			return match[0] + `[Things](${thingsLink})\n\n` + afterFrontmatter;
		} else {
			// Add at the beginning
			return `[Things](${thingsLink})\n\n` + content;
		}
	}

	/**
	 * Extract Things 3 link from note content
	 */
	extractThingsLink(content: string): string | null {
		const thingsLinkRegex = /\[Things\]\(([^)]+)\)/;
		const match = content.match(thingsLinkRegex);
		return match ? match[1] : null;
	}

	/**
	 * Remove Things 3 link from note content
	 */
	async removeThingsLinkFromNote(notePath: string): Promise<void> {
		try {
			const file = this.app.vault.getAbstractFileByPath(notePath) as TFile;
			if (!file) {
				throw new Error(`File not found: ${notePath}`);
			}

			const content = await this.app.vault.read(file);
			const updatedContent = this.removeThingsLinkFromContent(content);
			
			await this.app.vault.modify(file, updatedContent);
		} catch (error) {
			console.error('Failed to remove Things link from note:', error);
			throw error;
		}
	}

	/**
	 * Remove Things 3 link from content
	 */
	private removeThingsLinkFromContent(content: string): string {
		const thingsLinkRegex = /\[Things\]\([^)]+\)\s*\n?/g;
		return content.replace(thingsLinkRegex, '');
	}

	/**
	 * Create a bidirectional link between Obsidian and Things 3
	 */
	async createBidirectionalLink(obsidianPath: string, thingsId: string, thingsType: 'project' | 'task'): Promise<void> {
		// Create Things 3 link for Obsidian
		const thingsLink = this.createThingsLink(thingsType, thingsId);
		await this.updateNoteWithLink(obsidianPath, thingsLink);

		// Create Obsidian link for Things 3 (this would be added to Things 3 notes)
		const obsidianLink = this.createObsidianLink(obsidianPath);
		console.log(`Add this link to Things 3 ${thingsType} notes: ${obsidianLink}`);
	}

	/**
	 * Get all notes with Things 3 links
	 */
	async getNotesWithThingsLinks(): Promise<Array<{ file: TFile; link: string }>> {
		const files = this.app.vault.getMarkdownFiles();
		const notesWithLinks: Array<{ file: TFile; link: string }> = [];

		for (const file of files) {
			const content = await this.app.vault.read(file);
			const thingsLink = this.extractThingsLink(content);
			
			if (thingsLink) {
				notesWithLinks.push({ file, link: thingsLink });
			}
		}

		return notesWithLinks;
	}

	/**
	 * Validate Things 3 link format
	 */
	validateThingsLink(link: string): boolean {
		const thingsLinkRegex = /^things:\/\/\/show\?id=[a-zA-Z0-9]+$/;
		return thingsLinkRegex.test(link);
	}

	/**
	 * Extract ID from Things 3 link
	 */
	extractThingsId(link: string): string | null {
		const match = link.match(/things:\/\/\/show\?id=([a-zA-Z0-9]+)/);
		return match ? match[1] : null;
	}

	/**
	 * Create a project link with additional metadata
	 */
	createProjectLink(projectId: string, projectTitle?: string): string {
		const baseLink = this.createThingsLink('project', projectId);
		
		if (projectTitle) {
			return `[${projectTitle}](${baseLink})`;
		}
		
		return `[Project Link](${baseLink})`;
	}

	/**
	 * Create a task link with additional metadata
	 */
	createTaskLink(taskId: string, taskTitle?: string): string {
		const baseLink = this.createThingsLink('task', taskId);
		
		if (taskTitle) {
			return `[${taskTitle}](${baseLink})`;
		}
		
		return `[Task Link](${baseLink})`;
	}
}