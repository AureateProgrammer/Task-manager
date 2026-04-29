import type { TaskFilterProps } from '../../types';

export const TaskFilter = ({ filters, sort, onFilterChange, onSortChange, onClearFilters }: TaskFilterProps) => {
  const activeCount = Number(Boolean(filters.status)) + Number(Boolean(filters.priority));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Search tasks"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value as typeof filters.status })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ priority: e.target.value as typeof filters.priority })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="flex gap-2">
          <select
            value={sort.field}
            onChange={(e) => onSortChange({ field: e.target.value as typeof sort.field })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="createdAt">Sort: Created</option>
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="title">Sort: Title</option>
          </select>

          <button
            type="button"
            onClick={() =>
              onSortChange({ direction: sort.direction === 'asc' ? 'desc' : 'asc' })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            {sort.direction === 'asc' ? 'Asc' : 'Desc'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Active filters: {activeCount}
      </p>
    </section>
  );
};