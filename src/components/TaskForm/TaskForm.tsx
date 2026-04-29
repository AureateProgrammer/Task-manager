import { type FormEvent, useEffect, useState } from 'react';
import type { TaskFormData, TaskFormErrors, TaskFormProps } from '../../types';
import { hasValidationErrors, validateTaskForm } from '../../utils/taskUtils';

const defaultForm: TaskFormData = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

export const TaskForm = ({ onSubmit, initialValues, onCancel }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>(defaultForm);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title,
        description: initialValues.description,
        status: initialValues.status,
        priority: initialValues.priority,
        dueDate: initialValues.dueDate,
      });
      setErrors({});
      return;
    }

    setFormData(defaultForm);
    setErrors({});
  }, [initialValues]);

  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validation = validateTaskForm(formData);
    setErrors(validation);

    if (hasValidationErrors(validation)) {
      return;
    }

    onSubmit(formData);

    if (!initialValues) {
      setFormData(defaultForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {initialValues ? 'Edit Task' : 'Add Task'}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Task title"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="What needs to be done?"
          rows={3}
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {initialValues ? 'Update Task' : 'Add Task'}
        </button>
        {initialValues && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
