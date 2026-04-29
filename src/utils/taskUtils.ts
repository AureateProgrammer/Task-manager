import type {
	FilterState,
	SortState,
	Task,
	TaskFormData,
	TaskFormErrors,
	TaskPriority,
	TaskStats,
} from '../types';

const STORAGE_KEY = 'task-dashboard.tasks';

const PRIORITY_RANK: Record<TaskPriority, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

export function generateTaskId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createTask(formData: TaskFormData): Task {
	return {
		id: generateTaskId(),
		title: formData.title.trim(),
		description: formData.description.trim(),
		status: formData.status,
		priority: formData.priority,
		dueDate: formData.dueDate,
		createdAt: new Date().toISOString(),
	};
}

export function validateTaskForm(formData: TaskFormData): TaskFormErrors {
	const errors: TaskFormErrors = {};

	if (!formData.title.trim()) {
		errors.title = 'Title is required.';
	} else if (formData.title.trim().length < 3) {
		errors.title = 'Title must be at least 3 characters.';
	}

	if (!formData.description.trim()) {
		errors.description = 'Description is required.';
	}

	if (!formData.dueDate) {
		errors.dueDate = 'Due date is required.';
	}

	return errors;
}

export function hasValidationErrors(errors: TaskFormErrors): boolean {
	return Object.values(errors).some(Boolean);
}

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
	return tasks.filter((task) => {
		const matchesStatus = !filters.status || task.status === filters.status;
		const matchesPriority = !filters.priority || task.priority === filters.priority;
		const q = filters.search.trim().toLowerCase();
		const matchesSearch =
			q.length === 0 ||
			task.title.toLowerCase().includes(q) ||
			task.description.toLowerCase().includes(q);

		return matchesStatus && matchesPriority && matchesSearch;
	});
}

export function sortTasks(tasks: Task[], sort: SortState): Task[] {
	const sorted = [...tasks].sort((a, b) => {
		if (sort.field === 'priority') {
			return PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority];
		}

		if (sort.field === 'dueDate') {
			return a.dueDate.localeCompare(b.dueDate);
		}

		if (sort.field === 'title') {
			return a.title.localeCompare(b.title);
		}

		return a.createdAt.localeCompare(b.createdAt);
	});

	return sort.direction === 'asc' ? sorted : sorted.reverse();
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		return dateString;
	}

	return date.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export function getTaskStats(tasks: Task[]): TaskStats {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const pending = tasks.filter((task) => task.status === 'pending').length;
	const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
	const completed = tasks.filter((task) => task.status === 'completed').length;
	const overdue = tasks.filter((task) => {
		if (task.status === 'completed') {
			return false;
		}

		const due = new Date(task.dueDate);
		due.setHours(0, 0, 0, 0);
		return due < today;
	}).length;

	return {
		total: tasks.length,
		pending,
		inProgress,
		completed,
		overdue,
	};
}

export function moveTask(tasks: Task[], taskId: string, direction: 'up' | 'down'): Task[] {
	const index = tasks.findIndex((task) => task.id === taskId);
	if (index === -1) {
		return tasks;
	}

	const targetIndex = direction === 'up' ? index - 1 : index + 1;
	if (targetIndex < 0 || targetIndex >= tasks.length) {
		return tasks;
	}

	const reordered = [...tasks];
	const [moved] = reordered.splice(index, 1);
	reordered.splice(targetIndex, 0, moved);
	return reordered;
}

export function loadTasksFromStorage(): Task[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			return [];
		}

		const parsed = JSON.parse(raw) as Task[];
		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed;
	} catch {
		return [];
	}
}

export function saveTasksToStorage(tasks: Task[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function exportTasksAsJson(tasks: Task[]): void {
	const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `tasks-${new Date().toISOString().slice(0, 10)}.json`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

export function importTasksFromJson(file: File): Promise<Task[]> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			try {
				const parsed = JSON.parse(String(reader.result)) as Task[];
				if (!Array.isArray(parsed)) {
					reject(new Error('Invalid file format.'));
					return;
				}

				resolve(parsed);
			} catch {
				reject(new Error('Could not parse the selected file.'));
			}
		};

		reader.onerror = () => reject(new Error('Unable to read the selected file.'));
		reader.readAsText(file);
	});
}
