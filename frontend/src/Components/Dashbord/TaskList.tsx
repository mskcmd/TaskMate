import React, { useState } from "react";
import { AddTask, Task } from "../../utils/Types";
import TaskHeader from "./TaskHeader";
import TaskListBody from "./TaskListBody";
import CompletedTasks from "./CompletedTasks";
import {
  addNewTask,
  isCompleted,
  isDelete,
  upadateTask,
} from "../../Api/Taskapi";
import Swal from "sweetalert2";
import { TaskForm } from "./TaskForm";
import toast, { Toaster } from "react-hot-toast";
import { EditTaskForm } from "./EditTaskForm";
import { useChatState } from "../../Context/UserContext";

interface TaskListProps {
  tasks: Task[];
  onTaskComplete?: (taskId: string) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onAddTask?: () => void;
  onTaskRefresh: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], onTaskRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  console.log("selectedTask",selectedTask);
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditOpenModal = () => {
    setEditIsModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setEditIsModalOpen(false);
  };

  const handleEditTask = async (task: Task) => {
    setSelectedTask(task);
    handleEditOpenModal();
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = Array.isArray(tasks)
    ? tasks.slice(indexOfFirstTask, indexOfLastTask)
    : [];

  const handleTaskComplete = async (taskId: string) => {
    try {
      const result = await isCompleted(taskId);
      console.log(result);
      onTaskRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!isConfirmed) {
        return;
      }

      const result = await isDelete(taskId);
      console.log(result);

      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      onTaskRefresh();
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete the task. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const { user } = useChatState();

  console.log("user", user);

  const handleSave = async (formData: AddTask) => {
    console.log("datas", formData);
    if (!user || !user._id) {
      console.log("User is not logged in or user._id is missing");
      return; 
    }

    let userId: string = user._id;
    try {
      const { taskName, description, isCompleted } = formData;
      console.log(userId, taskName, description, isCompleted);

      const result = await addNewTask({
        userId,
        taskName,
        description,
        isCompleted,
      });
      console.log(result);
      onTaskRefresh();
      handleCloseModal();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (updatedTask: AddTask) => {
    try {
      console.log(updatedTask);
      const { userId, taskName, description, isCompleted } = updatedTask;
      console.log(userId, taskName, description, isCompleted);
      const result = await upadateTask({
        userId,
        taskName,
        description,
        isCompleted,
      });

      console.log(result);
      onTaskRefresh();
      handleEditCloseModal();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  const completedTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.isCompleted)
    : [];

  return (
    <div className="container mx-auto px-4  ">
      <Toaster position="top-right" />
      <TaskHeader onAddTask={() => handleOpenModal()} />
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        {!Array.isArray(tasks) || tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks available. Add a new task!
          </p>
        ) : (
          <>
            <TaskListBody
              tasks={currentTasks}
              currentPage={currentPage}
              totalPages={Math.ceil(tasks.length / tasksPerPage)}
              onTaskComplete={handleTaskComplete}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
              setCurrentPage={setCurrentPage}
            />
            <CompletedTasks tasks={completedTasks} />
          </>
        )}
      </div>

      <TaskForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      <EditTaskForm
        isOpen={isEditModalOpen}
        onClose={handleEditCloseModal}
        onSave={handleUpdateTask}
        initialTask={selectedTask}
      />
    </div>
  );
};

export default TaskList;
