import type { TaskListProps } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';

export const TaskList = ({
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
}: TaskListProps) => {
  return (
    <section className="space-y-3">
      {tasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 py-10 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
          No tasks match these filters.
        </p>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            total={tasks.length}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
        ))
      )}
    </section>
  );
};