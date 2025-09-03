import { ThingsTag } from './types';

export class TagHandler {
	/**
	 * Extract tags from markdown content
	 */
	extractTags(content: string): string[] {
		const tags: string[] = [];
		
		// Extract frontmatter tags
		const frontmatterTags = this.extractFrontmatterTags(content);
		tags.push(...frontmatterTags);
		
		// Extract inline tags from main content (excluding task lines)
		const inlineTags = this.extractInlineTagsFromMainContent(content);
		tags.push(...inlineTags);
		
		// Remove duplicates and return
		return [...new Set(tags)];
	}

	/**
	 * Extract tags from frontmatter
	 */
	private extractFrontmatterTags(content: string): string[] {
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
		const match = content.match(frontmatterRegex);
		
		if (!match) {
			return [];
		}

		const frontmatter = match[1];
		const tags: string[] = [];

		// Look for tags field in frontmatter
		const lines = frontmatter.split('\n');
		for (const line of lines) {
			if (line.toLowerCase().startsWith('tags:')) {
				const value = line.substring(5).trim();
				const parsedTags = this.parseArrayValue(value);
				tags.push(...parsedTags);
			}
		}

		return tags;
	}

	/**
	 * Extract inline tags from main content (excluding task lines)
	 */
	private extractInlineTagsFromMainContent(content: string): string[] {
		// Remove frontmatter first
		let mainContent = content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n/, '');
		
		// Remove task lines (lines starting with - [ ] or - [x])
		mainContent = mainContent.replace(/^(\s*)-\s*\[[ x]\]\s.*$/gm, '');
		
		// Now extract tags from the remaining content
		const tagRegex = /#([a-zA-Z0-9_-]+)/g;
		const tags: string[] = [];
		let match;

		while ((match = tagRegex.exec(mainContent)) !== null) {
			tags.push(match[1]);
		}

		return tags;
	}

	/**
	 * Parse array values from frontmatter
	 */
	private parseArrayValue(value: string): string[] {
		// Handle YAML array format: ["item1", "item2"]
		if (value.startsWith('[') && value.endsWith(']')) {
			try {
				return JSON.parse(value);
			} catch {
				// Fall back to simple parsing
			}
		}

		// Handle simple comma-separated format
		return value.split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
	}

	/**
	 * Map Obsidian tags to Things 3 tags
	 */
	mapTags(obsidianTags: string[], tagMapping: Record<string, string>): string[] {
		return obsidianTags.map(tag => {
			// Check if there's a specific mapping
			if (tagMapping[tag]) {
				return tagMapping[tag];
			}
			
			// Default mapping: convert to Things 3 format
			return this.convertToThingsFormat(tag);
		});
	}

	/**
	 * Convert Obsidian tag format to Things 3 format
	 */
	private convertToThingsFormat(tag: string): string {
		// Convert forward slashes to dashes (Things 3 doesn't support slashes in tags)
		// Remove other special characters and convert to title case
		return tag
			.replace(/\//g, '-')
			.replace(/[^a-zA-Z0-9\s-]/g, '')
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	/**
	 * Create tags in Things 3
	 */
	async createThingsTags(tags: string[]): Promise<void> {
		for (const tag of tags) {
			await this.createSingleTag(tag);
		}
	}

	/**
	 * Create a single tag in Things 3
	 */
	private async createSingleTag(tagName: string): Promise<void> {
		// Things 3 URL scheme for creating tags
		const url = `things:///add?title=${encodeURIComponent(tagName)}&type=tag`;
		
		try {
			// Open URL to create tag
			window.open(url, '_blank');
		} catch (error) {
			console.error(`Failed to create tag "${tagName}":`, error);
		}
	}

	/**
	 * Get existing tags from Things 3
	 */
	async getExistingTags(): Promise<ThingsTag[]> {
		// This would require Things 3 API access or URL scheme query
		// For now, return empty array as we can't query existing tags
		return [];
	}

	/**
	 * Check if tag exists in Things 3
	 */
	async tagExists(tagName: string): Promise<boolean> {
		const existingTags = await this.getExistingTags();
		return existingTags.some(tag => tag.name === tagName);
	}

	/**
	 * Apply tags to a project or task
	 */
	async applyTagsToItem(itemId: string, tags: string[], itemType: 'project' | 'task'): Promise<void> {
		for (const tag of tags) {
			const url = `things:///update?${itemType}=${itemId}&tags=${encodeURIComponent(tag)}`;
			
			try {
				window.open(url, '_blank');
			} catch (error) {
				console.error(`Failed to apply tag "${tag}" to ${itemType} "${itemId}":`, error);
			}
		}
	}

	/**
	 * Remove tags from a project or task
	 */
	async removeTagsFromItem(itemId: string, tags: string[], itemType: 'project' | 'task'): Promise<void> {
		for (const tag of tags) {
			const url = `things:///update?${itemType}=${itemId}&remove-tags=${encodeURIComponent(tag)}`;
			
			try {
				window.open(url, '_blank');
			} catch (error) {
				console.error(`Failed to remove tag "${tag}" from ${itemType} "${itemId}":`, error);
			}
		}
	}
}