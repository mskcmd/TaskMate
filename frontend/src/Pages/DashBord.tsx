import React, { useEffect, useState } from "react";
import Header from "../Components/Dashbord/Header";
import TaskList from "../Components/Dashbord/TaskList";
import { getTask } from "../Api/Taskapi";
import { useChatState } from "../Context/UserContext";
import { Task } from "../utils/Types";


const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false); 

  const { user } = useChatState();

  async function fetchTasks() {
    try {
      if (user && user?._id) {
        const result = await getTask(user?._id);
        setTasks(result);
      } else {
        console.log("No user ID available");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  const triggerRefresh = () => {
    setRefreshTrigger((prev) => !prev); // refetch
  };
  

  useEffect(() => {
    fetchTasks();
  }, [user, refreshTrigger]);

  return (
    <div className="min-h-screen bg-gray-50 font-serif ">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <TaskList tasks={tasks} onTaskRefresh={triggerRefresh} />
      </div>
    </div>
  );
};

export default Dashboard;
