import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Task } from '../../utils/Types';

interface TaskItemProps {
  task: Task;
  onTaskComplete?: (taskId: string) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onTaskComplete,
  onTaskEdit,
  onTaskDelete,
}) => (
  <div
    className={`flex items-center justify-between p-4 border-b rounded-lg shadow-sm ${
      task.isCompleted ? 'bg-green-50 opacity-70' : 'bg-white'
    }`}
  >
    <div className="flex items-center space-x-4">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onTaskComplete?.(task._id)}
        className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
      />
      <div>
        <span
          className={`${
            task.isCompleted
              ? 'line-through text-gray-500'
              : 'text-gray-800'
          }`}
        >
          {task.taskName}
        </span>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => onTaskEdit?.(task)}
        className="text-blue-500 hover:text-blue-600 transition"
      >
        <Edit className="w-5 h-5" />
      </button>
      <button
        onClick={() => onTaskDelete?.(task._id)}
        className="text-red-500 hover:text-red-600 transition"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default TaskItem;
