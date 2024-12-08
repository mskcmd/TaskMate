export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
}

export interface Task {
  _id: string;
  taskName: string;
  description: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddTask {
  userId: string |any;
  taskName: string;
  description: string;
  isCompleted: boolean;
}

export interface AddTaskErros {
  userId?: string;
  taskName?: string;
  description?: string;
}