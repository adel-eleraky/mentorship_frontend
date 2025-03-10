import { useEffect, useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
// import { BrowserRouter, Route, Routes } from "react-router";

import Meeting from "./pages/Meeting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import Store from "./rtk/Store";
import UserProfile from "./pages/UserProfile";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import AuthenticationContextProvider from './Context/AuthContext.jsx';

import MentorProfile from "./pages/MentorProfile/MentorProfile";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free";
import "bootstrap-icons/font/bootstrap-icons.css";

import MentorDashboard from "./pages/MentorDashboard";
import BrowseMentors from "./pages/BrowseMentors";
// import Chat from "./components/Chat/Chat";

const socket = io("http://localhost:3000");

function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <AuthenticationContextProvider>
            <NavBar />

            <Routes>
              <Route path="mentorprofile" element={<MentorProfile />} />

              <Route path="/" element={<Home />} />

              <Route path="mentors" element={<BrowseMentors />} />

              {/* protected Routes */}
              <Route
                path="/meeting/:id"
                element={
                  <ProtectedRoutes>
                    <Meeting />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoutes>
                    <Chat />
                  </ProtectedRoutes>
                }
              />
              <Route path="user" element={<ProtectedRoutes> <UserProfile /> </ProtectedRoutes>}></Route>
              {/* routes for Login & Register */}
              <Route path="mentor" element={<ProtectedRoutes> <MentorDashboard /> </ProtectedRoutes>}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />
          </AuthenticationContextProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
