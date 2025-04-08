import { useEffect, useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
// import { BrowserRouter, Route, Routes } from "react-router";

import Meeting from "./pages/Meeting";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import Store from "./rtk/Store";
import UserProfile from "./pages/UserProfile";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import AuthenticationContextProvider from "./Context/AuthContext.jsx";

import MentorProfile from "./pages/MentorProfile/MentorProfile";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free";
import "bootstrap-icons/font/bootstrap-icons.css";

import MentorDashboard from "./pages/MentorDashboard";
import BrowseMentors from "./pages/BrowseMentors";
import ProtectRoute from "./components/ProtectRoute.jsx";
import UnAuthRoute from "./components/UnAuthRoute.jsx";
import Layout from "./components/Layout.jsx";
import Verify from "./pages/Verify.jsx";
import Community from "./pages/Community.jsx";
import CommunityUserProfile from "./pages/community/userProfile/UserProfile.jsx";
import Success from './pages/Booking/Success.jsx';
import Cancel from './pages/Booking/Cancel.jsx';
// import Chat from "./components/Chat/Chat";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";


const socket = io("http://localhost:3000");

function App() {
  const location = useLocation();
  const hideNavFooter = location.pathname.startsWith("/meeting/");
  

  return (
    <Provider store={Store}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="mentorprofile/:id" element={<MentorProfile />} />

          <Route path="/" element={<Home />} />

          <Route path="mentors" element={<BrowseMentors />} />

          <Route path="community" element={<Community />} />
          <Route path="community/user/:id/:role" element={<CommunityUserProfile />} />

          {/* protected Routes */}

          <Route
            path="user"
            element={
              <ProtectRoute>
                <UserProfile />
              </ProtectRoute>
            }
          ></Route>
          {/* routes for Login & Register */}
          <Route
            path="mentor"
            element={
              <ProtectRoute>
                <MentorDashboard />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <UnAuthRoute>
                <Login />
              </UnAuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <UnAuthRoute>
                <Register />
              </UnAuthRoute>
            }
          />

          {/* <Route path="verify" element={<Verify />} /> */}
          <Route path="confirm-email/:token" element={<Verify />} />
          {/* <Route
          path="/chat"
          element={
            <ProtectRoute>
              <Chat />
            </ProtectRoute>
          }
        /> */}
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          {/* Forgot Password and Reset Password routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route
          path="/meeting/:id"
          element={
            // <ProtectRoute>
            <Meeting />
            // </ProtectRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectRoute>
              <Chat />
            </ProtectRoute>
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
