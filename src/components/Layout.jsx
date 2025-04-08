import React, { useEffect } from 'react'
import NavBar from './NavBar/NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../rtk/features/authSlice'
import Toast from './Toast'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import { getUserNotifications } from '../rtk/features/notificationSlice'
const socket = io('http://localhost:3000', {
    transports: ["websocket"], // Try forcing WebSocket transport
    withCredentials: true,
});


function Layout() {


    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { notifications, loadingMark } = useSelector(state => state.notification)

    useEffect(() => {
        dispatch(getLoggedInUser())
    }, [])
    
    useEffect(() => {
        dispatch(getUserNotifications())
    }, [loadingMark])

    useEffect(() => {

        if (user?._id) {
            socket.emit("login", user?._id);
        }

        socket.on("notification", data => {
            dispatch(getUserNotifications())
            toast.info(`${data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })

        return () => {
            socket.off("notification");
        };
    }, [user, socket])

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
            <Toast />
        </>
    )
}

export default Layout
