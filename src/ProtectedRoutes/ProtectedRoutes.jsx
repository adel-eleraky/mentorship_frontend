import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../Context/AuthContext";

export default function ProtectedRoutes({ children }) {
  const { token } = useAuthentication();
  
  if (token) {
    return children;
  } else {
    // If no token, redirect to /login
    return <Navigate to="/login" state={{ message: "Not allowed, You must log in first!" }} />;
  }
}
