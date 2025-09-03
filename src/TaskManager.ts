import { Task } from './types';

export class TaskManager {
	/**
	 * Parse checkboxes from markdown content
	 */
	parseCheckboxes(content: string): Task[] {
		const tasks: Task[] = [];
		const lines = content.split('\n');
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const task = this.parseTaskLine(line, i);
			
			if (task) {
				tasks.push(task);
			}
		}

		return tasks;
	}

	/**
	 * Parse a single task line
	 */
	private parseTaskLine(line: string, lineNumber: number): Task | null {
		// Match checkbox pattern: - [ ] or - [x] followed by task text
		const checkboxRegex = /^(\s*)-\s*\[([ x])\]\s*(.+)$/;
		const match = line.match(checkboxRegex);
		
		if (!match) {
			return null;
		}

		const [, indentation, checkbox, text] = match;
		const completed = checkbox === 'x';
		const indentationLevel = indentation.length;

		// Extract task details
		const taskText = this.cleanTaskText(text);
		const dueDate = this.extractDueDate(text);
		const notes = this.extractTaskNotes(text);

		return {
			text: taskText,
			completed,
			lineNumber,
			indentation: indentationLevel,
			dueDate,
			notes,
			tags: [], // Don't extract tags from tasks - keep them project-level only
		};
	}

	/**
	 * Clean task text by removing metadata
	 */
	private cleanTaskText(text: string): string {
		// Remove due date markers
		let cleaned = text.replace(/📅\s*\d{4}-\d{2}-\d{2}/g, '');
		
		// Remove notes markers
		cleaned = cleaned.replace(/📝\s*.*$/, '');
		
		// Clean up whitespace
		cleaned = cleaned.trim();
		
		return cleaned;
	}

	/**
	 * Extract due date from task text
	 */
	private extractDueDate(text: string): string | undefined {
		const dueDateRegex = /📅\s*(\d{4}-\d{2}-\d{2})/;
		const match = text.match(dueDateRegex);
		return match ? match[1] : undefined;
	}

	/**
	 * Extract tags from task text
	 */
	private extractTaskTags(text: string): string[] {
		const tagRegex = /#([a-zA-Z0-9_-]+)/g;
		const tags: string[] = [];
		let match;

		while ((match = tagRegex.exec(text)) !== null) {
			tags.push(match[1]);
		}

		return tags;
	}

	/**
	 * Extract notes from task text
	 */
	private extractTaskNotes(text: string): string | undefined {
		const notesRegex = /📝\s*(.+)$/;
		const match = text.match(notesRegex);
		return match ? match[1].trim() : undefined;
	}

	/**
	 * Format task for Things 3 export
	 */
	formatTaskForThings(task: Task): string {
		let formatted = task.text;
		
		// Add due date if present
		if (task.dueDate) {
			formatted += ` 📅 ${task.dueDate}`;
		}
		
		// Add tags if present
		if (task.tags && task.tags.length > 0) {
			formatted += ` ${task.tags.map(tag => `#${tag}`).join(' ')}`;
		}
		
		// Add notes if present
		if (task.notes) {
			formatted += ` 📝 ${task.notes}`;
		}
		
		return formatted;
	}

	/**
	 * Handle subtasks by organizing them hierarchically
	 */
	organizeSubtasks(tasks: Task[]): Task[] {
		const organized: Task[] = [];
		const stack: Task[] = [];

		for (const task of tasks) {
			// Pop from stack until we find the correct parent level
			while (stack.length > 0 && stack[stack.length - 1].indentation >= task.indentation) {
				stack.pop();
			}

			// Add to organized list
			organized.push(task);

			// Push to stack for potential children
			stack.push(task);
		}

		return organized;
	}

	/**
	 * Get tasks by completion status
	 */
	getTasksByStatus(tasks: Task[], completed: boolean): Task[] {
		return tasks.filter(task => task.completed === completed);
	}

	/**
	 * Get tasks with due dates
	 */
	getTasksWithDueDates(tasks: Task[]): Task[] {
		return tasks.filter(task => task.dueDate !== undefined);
	}
}