import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import io from 'socket.io-client';
import axios from 'axios';

function Chat() {
  const socket = io('http://localhost:3000');
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [messages, setMessages] = useState([]); 



  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/rooms');
      setRooms(data.data);
    
    } catch (error) {
      console.log('Error fetching rooms:', error);
    }
  };

  const joinRoom = (room) => {
    setSelectedRoom(room);
    socket.emit('join_room', room._id);
  }
  useEffect(() => {

    fetchRooms();

    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Update chat history
    });

    socket.on("send_room_messages" , (data) => {
      console.log(data)
      setMessages(data)
    })

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (selectedRoom && message) {
      const msgData = {
        sender: '67c2924c2fb827c27cc35b40',
        sender_role: "Mentor",
        room: selectedRoom._id,
        content: message,
      };
      socket.emit('send_message', msgData);
      setMessages((prevMessages) => [...prevMessages, msgData]); // Update local messages
      setMessage('');
      console.log(msgData);
      
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Rooms List */}
        <div className="col-md-4">
          <h3 className="text-center">Chat Rooms</h3>
          <ul className="list-group">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <li key={room._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {room.name}
                  <button className="btn btn-primary btn-sm" onClick={() => joinRoom(room)}>
                    Join
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center">Loading rooms...</p>
            )}
          </ul>
        </div>

        {/* Chat Box */}
        <div className="col-md-8">
          {selectedRoom ? (
            <div>
              <h3 className="text-center">Chat Room: {selectedRoom.name}</h3>
              <div className="chat-box border rounded p-3" style={{ height: '300px', overflowY: 'auto' }}>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div key={index} >
                      <strong>{msg.sender_role}</strong>: {msg.content}
                    </div>
                  ))
                ) : (
                  <p className="text-center">No messages yet.</p>
                )}
              </div>

              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-success" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <h5 className="text-center">Select a room to start chatting</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
