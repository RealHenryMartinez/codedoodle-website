import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

interface IProps {
  path: string;
  element?: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProps> = ({ path, element }: IProps) => {
  // Retrieve the login status from localStorage
  const storedLogin = localStorage.getItem("login");

  return (
    <>
    <Routes>
      {/* Render the protected route if the user is logged in */}
      {storedLogin !== 'false' ? (
        <Route path={path} element={element} />
      ) : (
        // Redirect to login page if the user is not logged in
        location.pathname !== "/auth/login" && (
          <Route element={<Navigate to="/auth/login" replace />} />
        )
      )}
    </Routes>
    </>
  );
};
