import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function UnAuthRoute({ children}) {
    const { user } = useSelector((state) => state.auth);

    console.log(user)
    if (user && user.confirmEmail) {
        if (user.role === "Mentor") return <Navigate to="/mentor" />
        if (user.role === "User") return <Navigate to="/user" />
    } else {
        return children;
    }
}

export default UnAuthRoute
