import React from 'react'
import io from "socket.io-client"
import { useEffect, useState } from 'react'
import axios from 'axios';


function Login() {
    const socket = io("http://localhost:3000")
    const [message, setMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message",
       {sender_id: "67bdbc12abcca0e18a724d5e" ,
         room: "67bdae230ce91c62982afd99", 
          content: message});
    setMessage("");
  };


  useEffect(() => {
    const {data}= axios.get(`http://localhost:3000/api/v1/rooms`)
    console.log(data);
    
    socket.on("receive_message", (data) => {
      console.log(data)
    })
  }, [socket])
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

    </>
  )
}

export default Login