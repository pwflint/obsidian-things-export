// Type definitions for the Things 3 Project Export plugin

export interface ProjectMetadata {
	title: string;
	startDate?: string;
	endDate?: string;
	status?: string;
	keywords?: string[];
	tags?: string[];
	aliases?: string[];
	description?: string;
}

export interface Task {
	text: string;
	completed: boolean;
	lineNumber: number;
	indentation: number;
	dueDate?: string;
	notes?: string;
	tags?: string[];
}

export interface ThingsProject {
	id: string;
	title: string;
	notes?: string;
	area?: string;
	startDate?: string;
	deadline?: string;
	tags?: string[];
}

export interface ThingsTask {
	id: string;
	title: string;
	projectId?: string;
	completed: boolean;
	dueDate?: string;
	notes?: string;
	tags?: string[];
}

export interface ThingsTag {
	name: string;
	id?: string;
}

export interface ExportResult {
	success: boolean;
	projectId?: string;
	taskIds?: string[];
	error?: string;
}

export interface ParsedContent {
	metadata: ProjectMetadata;
	tasks: Task[];
	tags: string[];
	notes: string;
	rawContent: string;
}