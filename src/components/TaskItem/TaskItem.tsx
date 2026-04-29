import type { TaskItemProps, TaskStatus } from '../../types';
import { formatDate } from '../../utils/taskUtils';

export const TaskItem = ({
  task,
  index,
  total,
  onStatusChange,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
}: TaskItemProps) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {task.priority}
        </span>
      </div>

      <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">Due: {formatDate(task.dueDate)}</p>

      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Status</label>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => onMoveUp(task.id)}
          disabled={index === 0}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 disabled:opacity-40 dark:border-gray-600 dark:text-gray-200"
        >
          Up
        </button>
        <button
          type="button"
          onClick={() => onMoveDown(task.id)}
          disabled={index === total - 1}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 disabled:opacity-40 dark:border-gray-600 dark:text-gray-200"
        >
          Down
        </button>
      </div>
    </article>
  );
}
