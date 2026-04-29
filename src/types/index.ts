export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type SortField = 'dueDate' | 'priority' | 'title' | 'createdAt';
export type SortDirection = 'asc' | 'desc';
export type Theme = 'light' | 'dark';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;       // ISO date string "YYYY-MM-DD"
  createdAt: string;     // ISO date-time string
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskFormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

export interface FilterState {
  status: TaskStatus | '';
  priority: TaskPriority | '';
  search: string;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  initialValues?: Task;      // present when editing an existing task
  onCancel?: () => void;
}

export interface TaskFilterProps {
  filters: FilterState;
  sort: SortState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSortChange: (sort: Partial<SortState>) => void;
}

export interface DashboardProps {
  theme: Theme;
  onThemeToggle: () => void;
}
