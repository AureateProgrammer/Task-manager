import { useEffect, useMemo, useState } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import type { FilterState, SortState, Task, TaskFormData, Theme, TaskStatus } from './types';
import {
  createTask,
  exportTasksAsJson,
  filterTasks,
  getTaskStats,
  importTasksFromJson,
  loadTasksFromStorage,
  moveTask,
  saveTasksToStorage,
  sortTasks,
} from './utils/taskUtils';

const defaultFilters: FilterState = {
  status: '',
  priority: '',
  search: '',
};

const defaultSort: SortState = {
  field: 'createdAt',
  direction: 'desc',
};

const demoTasks: Task[] = [
  {
    id: 'seed-1',
    title: 'Set up dashboard structure',
    description: 'Create dashboard, list, and form layout',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Write utility helpers',
    description: 'Add filtering, sorting, and validation helpers',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasksFromStorage();
    return stored.length > 0 ? stored : demoTasks;
  });
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortState>(defaultSort);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('task-dashboard.theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('task-dashboard.theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sort);
  }, [tasks, filters, sort]);

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  const handleSubmitTask = (data: TaskFormData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? { ...task, ...data } : task)),
      );
      setEditingTask(null);
      return;
    }

    setTasks((prev) => [createTask(data), ...prev]);
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setEditingTask((prev) => (prev?.id === id ? null : prev));
  };

  const handleMoveUp = (id: string) => {
    setTasks((prev) => moveTask(prev, id, 'up'));
  };

  const handleMoveDown = (id: string) => {
    setTasks((prev) => moveTask(prev, id, 'down'));
  };

  const handleImport = async (file: File) => {
    try {
      const imported = await importTasksFromJson(file);
      setTasks(imported);
      setEditingTask(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Import failed.';
      alert(message);
    }
  };

  return (
    <Dashboard
      tasks={visibleTasks}
      stats={stats}
      filters={filters}
      sort={sort}
      editingTask={editingTask}
      theme={theme}
      onThemeToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      onSubmitTask={handleSubmitTask}
      onCancelEdit={() => setEditingTask(null)}
      onEditTask={setEditingTask}
      onStatusChange={handleStatusChange}
      onDeleteTask={handleDeleteTask}
      onMoveUp={handleMoveUp}
      onMoveDown={handleMoveDown}
      onFilterChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
      onSortChange={(next) => setSort((prev) => ({ ...prev, ...next }))}
      onClearFilters={() => setFilters(defaultFilters)}
      onExport={() => exportTasksAsJson(tasks)}
      onImport={handleImport}
    />
  );
}

export default App;
