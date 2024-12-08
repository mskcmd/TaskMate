import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import React from "react";

interface TaskHeaderProps {
  onAddTask?: () => void;
}

const TaskHeadr: React.FC<TaskHeaderProps> = ({ onAddTask }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
    <Button
      onClick={onAddTask}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      <Plus className="w-5 h-5" />
      Add Task
    </Button>
  </div>
);

export default TaskHeadr;
