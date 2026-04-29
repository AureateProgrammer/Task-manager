import type { TaskListProps } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';

export const TaskList = ({
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskListProps) => {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};