import react from 'react';
import {taskFilterProps} from '../types';

import React from "react";
import { TaskFilterProps } from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({
  onFilterChange
}) => {
  return (
    <div>
      <select
        onChange={(e) =>
          onFilterChange({ status: e.target.value as any })
        }
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        onChange={(e) =>
          onFilterChange({ priority: e.target.value as any })
        }
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};