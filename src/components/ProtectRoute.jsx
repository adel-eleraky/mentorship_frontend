import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../Context/AuthContext";
import { useSelector } from "react-redux";

export default function ProtectRoute({ children }) {
    const { user } = useSelector((state) => state.auth);

    if (user) {
        return children;
    } else {
        // If no token, redirect to /login
        return <Navigate to="/login" state={{ message: "Not allowed, You must log in first!" }} />;
    }
}
