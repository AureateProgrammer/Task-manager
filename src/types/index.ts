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
  dueDate: string;
  createdAt: string;
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

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

export interface TaskItemProps {
  task: Task;
  index: number;
  total: number;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  initialValues?: Task;
  onCancel?: () => void;
}

export interface TaskFilterProps {
  filters: FilterState;
  sort: SortState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSortChange: (sort: Partial<SortState>) => void;
  onClearFilters: () => void;
}

export interface DashboardProps {
  tasks: Task[];
  stats: TaskStats;
  filters: FilterState;
  sort: SortState;
  editingTask: Task | null;
  theme: Theme;
  onThemeToggle: () => void;
  onSubmitTask: (data: TaskFormData) => void;
  onCancelEdit: () => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSortChange: (sort: Partial<SortState>) => void;
  onClearFilters: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}
