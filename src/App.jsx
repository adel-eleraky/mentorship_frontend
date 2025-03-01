import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateButton from "./components/CreateButton";
import Layout from "./pages/Layout";
import Meeting from "./pages/Meeting";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {
      sender_id: "67bdbc12abcca0e18a724d5e",
      room: "67bdae230ce91c62982afd99",
      content: message,
    });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  // code for video

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <CreateButton /> },
        { path: "/meeting/:id", element: <Meeting /> },
      ],
    },
  ]);
  return (
    <>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
