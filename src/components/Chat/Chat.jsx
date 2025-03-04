import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

function Chat() {
  const socket = io('http://localhost:3000');
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const messagesEndRef = useRef(null);

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
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchRooms();

    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("send_room_messages", (data) => {
      setMessages(data);
    });

    return () => {
      socket.off('receive_message');
      socket.off('send_room_messages');
    };
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (selectedRoom && message.trim()) {
      const msgData = {
        sender: '67c2924c2fb827c27cc35b40',
        sender_role: "Mentor",
        room: selectedRoom._id,
        content: message,
        timestamp: new Date().toISOString()
      };
      socket.emit('send_message', msgData);
      setMessages((prevMessages) => [...prevMessages, msgData]);
      setMessage('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Filter rooms based on activeTab
  const filteredRooms = activeTab === 'all' ? rooms : 
                        activeTab === 'rooms' ? rooms.filter(room => !room.isDirectMessage) : 
                        rooms.filter(room => room.isDirectMessage);

  return (
    <div className="container mt-2 chat-app">
      <div className="row chat-container">
        {/* Rooms List */}
        <div className="col-md-3 room-list" style={{ height: '90vh', overflowY: 'auto' }}>
          <h3>Chats</h3>
          <div className="room-filters">
            <button 
              className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
            <button 
              className={`btn ${activeTab === 'users' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>
          
          <div className="rooms-container">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <button 
                  key={room._id} 
                  className={`but-room ${selectedRoom && selectedRoom._id === room._id ? 'active' : ''}`}
                  onClick={() => joinRoom(room)}
                >
                  <span className="room-name">{room.name}</span>
                  {room.unreadCount > 0 && (
                    <span className="badge bg-danger">{room.unreadCount}</span>
                  )}
                </button>
              ))
            ) : (
              <div className="empty-rooms">
                <p className="text-center">No rooms available</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Box */}
        <div className="col-md-9 chat-area  " >
          {selectedRoom ? (
            <div className="chat-content">
              <div className="chat-header">
                <h3>
                  <span className="room-indicator"></span>
                  {selectedRoom.name}
                </h3>
              </div>
              
              <div className="chat-box" style={{ height: '62vh', overflowY: 'auto' }}>
                {messages.length > 0 ? (
                  <div className="messages-container">
                    {messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`message ${msg.sender_role === "Mentor" ? 'outgoing' : 'incoming'}`}
                      >
                        <div className="message-header">
                          <strong>{msg.sender_role}</strong>
                          <span className="message-time">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </span>
                        </div>
                        <div className="message-content">{msg.content}</div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                )}
              </div>
              
              <div className="message-input-container">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="but-send" 
                  onClick={sendMessage}
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state select-room">
              <div className="empty-icon">👈</div>
              <p>Select a room to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;