import React from 'react';
import TaskItem from './TaskItem';
import PaginationControls from './Pagination';
import { Task } from '../../utils/Types';

interface TaskListBodyProps {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  onTaskComplete?: (taskId: string) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  setCurrentPage: (page: number) => void;
}

const TaskListBody: React.FC<TaskListBodyProps> = ({
  tasks,
  currentPage,
  totalPages,
  onTaskComplete,
  onTaskEdit,
  onTaskDelete,
  setCurrentPage,
}) => (
  <div className="lg:w-2/3 w-full ">
    <div className="space-y-4 mb-6">
      {
      tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onTaskComplete={onTaskComplete}
          onTaskEdit={onTaskEdit}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </div>
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />
  </div>
);

export default TaskListBody;
