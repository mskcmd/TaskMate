import Api from "../Services/axios";
import { AddTask, FormData } from "../utils/Types";

export const signup = async ({ fullName, email, password }: FormData) => {
  try {
    const result = await Api.post("signup", { fullName, email, password });
    return result.data;
  } catch (error) {
    console.log(error as Error);
  }
};

export const login = async ({ email, password }: FormData) => {
  try {
    const result = await Api.post("login", { email, password });
    return result.data;
  } catch (error) {
    console.log(error as Error);
  }
};

export const getTask = async (id: string | any) => {
  try {
    const response = await Api.get(`getTasks/${id}`);
    return response.data;
  } catch (error) {
    console.log(error as Error);
  }
};

export const isCompleted = async (id: string | any) => {
  try {
    const response = await Api.patch(`isCompleted/${id}`);
    return response.data;
  } catch (error) {
    console.log(error as Error);
  }
};

export const isDelete = async (id: string | any) => {
  try {
    const response = await Api.delete(`deleteTask/${id}`);
    return response.data;
  } catch (error) {
    console.log(error as Error);
  }
};

export const addNewTask = async ({ userId, taskName, description, isCompleted }: AddTask) => {
  try {
    const result = await Api.post("addTask", { userId, taskName, description, isCompleted });
    return result.data;
  } catch (error) {
    console.log(error as Error);
  }
};

export const upadateTask = async ({ userId, taskName, description, isCompleted }: AddTask) => {
  try {
    const result = await Api.put("editTask", { userId, taskName, description, isCompleted });
    return result.data;
  } catch (error) {
    console.log(error as Error);
  }
};