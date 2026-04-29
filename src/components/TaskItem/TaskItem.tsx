import TaskItemProps from '../types';
import React from "react";


export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete
}) => {
  return (
    <div> 
      <h3>{task.title}</h3>
      <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
    <select
      value={task.status}
      onChange={(e) => onStatusChange(task.id, e.target.value as any)}
    >
      <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
    </select>
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
  );
}
