import React, { useEffect } from 'react'
import NavBar from './NavBar/NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer/Footer'
import { useDispatch } from 'react-redux'
import { getLoggedInUser } from '../rtk/features/authSlice'

function Layout() {


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoggedInUser())
    }, [])

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
