import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../Context/AuthContext";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return children;
  } else {
    // If no token, redirect to /login
    return <Navigate to="/login" state={{ message: "Not allowed, You must log in first!" }} />;
  }
}
