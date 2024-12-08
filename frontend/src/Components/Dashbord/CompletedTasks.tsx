import React from 'react';
import { Task } from '../../utils/Types';

interface CompletedTasksProps {
  tasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => (
  <div className="lg:w-1/3 w-full">
    <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
    <div className="space-y-4">
      {tasks.slice(0, 3).map((task) => (
        <div
          key={task._id}
          className="p-4 border rounded-lg bg-green-50 opacity-80"
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="line-through text-gray-500">
              {task.taskName}
            </span>
          </div>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CompletedTasks;
