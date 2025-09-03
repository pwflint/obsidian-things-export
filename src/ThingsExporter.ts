import { ProjectMetadata, Task, ThingsProject, ThingsTask, ExportResult } from './types';

export class ThingsExporter {
	/**
	 * Create a new project in Things 3
	 */
	async createProject(metadata: ProjectMetadata): Promise<string> {
		// Use the same approach as the working plugin
		const title = encodeURIComponent(metadata.title);
		const notes = encodeURIComponent(metadata.description || '');
		const tags = metadata.tags ? encodeURIComponent(metadata.tags.join(',')) : '';
		
		// Debug logging
		console.log('Creating project with metadata:', {
			title: metadata.title,
			notes: metadata.description,
			tags: metadata.tags,
			encodedTags: tags
		});
		
		// Build URL similar to working plugin
		let url = `things:///add-project?title=${title}`;
		
		if (notes) {
			url += `&notes=${notes}`;
		}
		
		if (tags) {
			url += `&tags=${tags}`;
		}
		
		// Add x-success callback to get the actual project ID
		url += `&x-success=obsidian://project-id`;
		
		console.log('Final URL:', url);
		
		try {
			window.open(url, '_blank');
			// Return a placeholder ID - the real ID will come via the x-success callback
			return 'placeholder-project-id';
		} catch (error) {
			throw new Error(`Failed to create project: ${error.message}`);
		}
	}

	/**
	 * Create a task in Things 3
	 */
	async createTask(task: Task, projectId?: string): Promise<string> {
		// Use the same approach as the working plugin
		const title = encodeURIComponent(task.text);
		const notes = encodeURIComponent(task.notes || '');
		const tags = task.tags ? encodeURIComponent(task.tags.join(',')) : '';
		
		// Build URL similar to working plugin
		let url = `things:///add?title=${title}`;
		
		if (notes) {
			url += `&notes=${notes}`;
		}
		
		if (tags) {
			url += `&tags=${tags}`;
		}
		
		if (projectId && projectId !== 'placeholder-project-id') {
			url += `&list-id=${projectId}`;
		}
		
		// Add x-success callback to get the actual task ID
		url += `&x-success=obsidian://task-id`;
		
		try {
			window.open(url, '_blank');
			// Return a placeholder ID - the real ID will come via the x-success callback
			return 'placeholder-task-id';
		} catch (error) {
			throw new Error(`Failed to create task: ${error.message}`);
		}
	}

	// Note: Removed complex update methods since the working plugin doesn't use them
	// Tags and other metadata are included directly in the creation URLs

	// Note: Removed old build methods since we're using the simpler approach from the working plugin

	/**
	 * Export multiple tasks to a project
	 */
	async exportTasksToProject(tasks: Task[], projectId: string): Promise<ExportResult> {
		const taskIds: string[] = [];
		
		try {
			for (const task of tasks) {
				const taskId = await this.createTask(task, projectId);
				taskIds.push(taskId);
				// Tags are now included directly in the createTask URL
			}

			return {
				success: true,
				projectId,
				taskIds,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Check if Things 3 is available
	 */
	async checkThingsAvailability(): Promise<boolean> {
		try {
			// Try to open Things 3 with a simple query
			const url = 'things:///show';
			window.open(url, '_blank');
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Get Things 3 project by ID
	 */
	async getProject(projectId: string): Promise<ThingsProject | null> {
		// This would require Things 3 API access
		// For now, return null as we can't query existing projects
		return null;
	}

	/**
	 * Get Things 3 task by ID
	 */
	async getTask(taskId: string): Promise<ThingsTask | null> {
		// This would require Things 3 API access
		// For now, return null as we can't query existing tasks
		return null;
	}
}