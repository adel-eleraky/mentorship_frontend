import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function UnAuthRoute({ children}) {
    const { user } = useSelector((state) => state.auth);

    if (user) {
        console.log(user , "here")
        if (user.role === "mentor") return <Navigate to="/mentor" />
        if (user.role === "user") return <Navigate to="/user" />
    } else {
        return children;
    }
}

export default UnAuthRoute
