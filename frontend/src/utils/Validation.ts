import { AddTask, AddTaskErros } from "./Types";

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
  
  export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email.trim())) return "Invalid email format";
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) return "Password is required";
    if (trimmedPassword.length < 6) return "Password must be at least 6 characters";
    return null;
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    const trimmedConfirmPassword = confirmPassword.trim();
    if (!trimmedConfirmPassword) return "Please confirm your password";
    if (password.trim() !== trimmedConfirmPassword) return "Passwords do not match";
    return null;
  };
  
  export const validateFullName = (fullName: string): string | null => {
    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) return "Full name is required";
    if (trimmedFullName.length < 2) return "Full name must be at least 2 characters";
    return null;
  };


  export const validateTaskForm = (formData: AddTask): { isValid: boolean; newErrors: AddTaskErros } => {
    let isValid = true;
    const newErrors: AddTaskErros = {};
  
    if (!formData.taskName) {
      newErrors.taskName = "taskName is required";
      isValid = false;
    }
    if (!formData.description) {
      newErrors.description = "description is required";
      isValid = false;
    }
  
    return { isValid, newErrors };
  };