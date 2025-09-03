import { ProjectMetadata, ParsedContent } from './types';

export class NoteParser {
	/**
	 * Parse frontmatter from markdown content
	 */
	parseFrontmatter(content: string): ProjectMetadata {
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
		const match = content.match(frontmatterRegex);
		
		if (!match) {
			// If no frontmatter, try to extract title from first heading
			const titleMatch = content.match(/^#\s+(.+)$/m);
			return {
				title: titleMatch ? titleMatch[1].trim() : 'Untitled Project',
			};
		}

		const frontmatter = match[1];
		const metadata: ProjectMetadata = {
			title: 'Untitled Project',
		};

		// Parse frontmatter fields
		const lines = frontmatter.split('\n');
		for (const line of lines) {
			const colonIndex = line.indexOf(':');
			if (colonIndex === -1) continue;

			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();

			switch (key.toLowerCase()) {
				case 'title':
					metadata.title = value;
					break;
				case 'start date':
				case 'startdate':
					metadata.startDate = value;
					break;
				case 'end date':
				case 'enddate':
					metadata.endDate = value;
					break;
				case 'status':
					metadata.status = value;
					break;
				case 'keywords':
					metadata.keywords = this.parseArrayValue(value);
					break;
				case 'tags':
					metadata.tags = this.parseArrayValue(value);
					break;
				case 'aliases':
					metadata.aliases = this.parseArrayValue(value);
					break;
			}
		}

		return metadata;
	}

	/**
	 * Extract notes content (everything except frontmatter and tasks)
	 */
	extractNotes(content: string): string {
		// Remove frontmatter
		let notes = content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n/, '');
		
		// Remove task lines (lines starting with - [ ] or - [x])
		notes = notes.replace(/^-\s*\[[ x]\]\s.*$/gm, '');
		
		// Remove empty lines and clean up
		notes = notes.replace(/^\s*$/gm, '').trim();
		
		return notes;
	}

	/**
	 * Parse array values from frontmatter (handles both YAML and simple formats)
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
	 * Parse complete note content into structured data
	 */
	parseContent(content: string): ParsedContent {
		const metadata = this.parseFrontmatter(content);
		const notes = this.extractNotes(content);
		
		// Extract tags from both frontmatter and inline content
		const frontmatterTags = metadata.tags || [];
		const inlineTags = this.extractInlineTags(content);
		const allTags = [...new Set([...frontmatterTags, ...inlineTags])];

		return {
			metadata,
			tasks: [], // Will be populated by TaskManager
			tags: allTags,
			notes,
			rawContent: content,
		};
	}

	/**
	 * Extract inline tags from markdown content
	 */
	private extractInlineTags(content: string): string[] {
		const tagRegex = /#([a-zA-Z0-9_-]+)/g;
		const tags: string[] = [];
		let match;

		while ((match = tagRegex.exec(content)) !== null) {
			tags.push(match[1]);
		}

		return tags;
	}
}