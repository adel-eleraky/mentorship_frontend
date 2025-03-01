import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Route, Routes } from "react-router";

const socket = io("http://localhost:3000");

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
