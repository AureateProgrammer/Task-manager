import react from "react";
import { TaskListProps } from "../types";
import { TaskItem } from "../TaskItem/TaskItem";


export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
    onDelete
}) => {
  return (
    <div>
        {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onStatusChange={onStatusChange} onDelete={onDelete} />
        ))}
    </div>
  );
}