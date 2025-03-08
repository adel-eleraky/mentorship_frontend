import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
// import { BrowserRouter, Route, Routes } from "react-router";
import CreateButton from "./components/CreateButton";
import Meeting from "./pages/Meeting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MentorProfile from "./pages/MentorProfile/MentorProfile";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import 'bootstrap-icons/font/bootstrap-icons.css';







// import Chat from "./components/Chat/Chat";

const socket = io("http://localhost:3000");

function App() {
  return (
    <>
        <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<CreateButton />} />
          <Route path="mentorprofile" element={<MentorProfile />} />

          <Route path="meeting/:id" element={<Meeting />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
