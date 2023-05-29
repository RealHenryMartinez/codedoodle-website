import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hook.js";
import { user } from "../store/slices/authSlice.js";

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProps> = ({ children }: IProps) => {
  const userData = useAppSelector(user);

  if (!userData) {
    // User is not authenticated
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
