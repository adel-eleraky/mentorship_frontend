import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Route, Routes } from "react-router";
import CreateButton from "./components/CreateButton";
import Meeting from "./pages/Meeting";

const socket = io("http://localhost:3000");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateButton />} />
          <Route path="meeting/:id" element={<Meeting />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
