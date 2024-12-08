import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export interface UserInfo {
    id?: string;
    email?: string;
  }
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const storedUserData = localStorage.getItem("userData");
    const userInfo: UserInfo | null = storedUserData 
      ? JSON.parse(storedUserData) 
      : null;
  
    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }
  
    return <>{children}</>;
  };