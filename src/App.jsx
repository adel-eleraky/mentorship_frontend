import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
// import { BrowserRouter, Route, Routes } from "react-router";
import CreateButton from "./components/CreateButton";
import Meeting from "./pages/Meeting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { Provider } from "react-redux";
import Store from "./rtk/Store";
import UserProfile from "./pages/UserProfile";
// import Chat from "./components/Chat/Chat";

const socket = io("http://localhost:3000");

function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<CreateButton />} />
            <Route path="meeting/:id" element={<Meeting />} />
            <Route path="user" element={<UserProfile />}></Route>
            <Route path="chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
