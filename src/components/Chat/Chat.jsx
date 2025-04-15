import React, { useEffect, useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPrivateMessage, addRoomMessage, getPrivateContacts, getRoomMessages, getRooms, getUserRooms } from '../../rtk/features/chatSlice';
const socket = io('http://localhost:3000', {
  transports: ["websocket"], // Try forcing WebSocket transport
  withCredentials: true,
});

function Chat() {
  const [message, setMessage] = useState('');
  // const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ selectedContact , setSelectedContact] = useState(null)
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch()
  const { roomMessages, rooms, userRooms, privateContacts } = useSelector(state => state.chat)
  const { user } = useSelector(state => state.auth)
  const [privateMessages , setPrivateMessages] = useState([])


  console.log("private", privateContacts)
  console.log("selected", selectedContact)


  console.log(activeTab)
  const joinRoom = async (room) => {
    setSelectedRoom(room);
    dispatch(getRoomMessages(room._id))
    socket.emit('join_room', room._id);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {

    dispatch(getUserRooms({id: user._id , role: user.role}))
    dispatch(getPrivateContacts())
    socket.on('receive_room_msg', (data) => {
      dispatch(addRoomMessage(data))
    });

    socket.on("send_room_messages", (data) => {
      setMessages(data);
    });


    socket.on("receive_private_msg" , data => {
      console.log("receive_private_msg" , data)
      dispatch(addPrivateMessage(data))
    })

    return () => {
      socket.off('receive_room_msg');
      socket.off('send_room_messages');
      socket.off('receive_private_msg');
    };
  }, [socket]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendRoomMessage = () => {
    if (selectedRoom && message.trim()) {
      const msgData = {
        sender: user._id,
        sender_role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
        room: selectedRoom._id,
        content: message,
        createdAt: new Date().toISOString()
      };
      socket.emit('send_room_msg', msgData);
      // setMessages((prevMessages) => [...prevMessages, msgData]);
      setMessage('');
    }
  };

  const sendPrivateMessage = () => {
    if (selectedContact && message.trim()) {
      const msgData = {
        sender: user?._id,
        sender_role: user?.role.charAt(0).toUpperCase() + user.role.slice(1),
        receiver: selectedContact?._id,
        content: message,
        createdAt: new Date().toISOString()
      };
      console.log("msg data",msgData)
      socket.emit('send_private_msg', msgData);
      // dispatch(getPrivateContacts())
      // setMessages((prevMessages) => [...prevMessages, msgData]);
      setMessage('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (selectedContact) {
      const filtered = privateContacts.filter((msg) =>
        (msg.sender._id === selectedContact._id && msg.receiver === user._id) ||
        (msg.sender._id === user._id && msg.receiver === selectedContact._id)
      );

      setPrivateMessages(filtered);
    }
  }, [selectedContact , privateContacts]);

  console.log("privtae messages",privateMessages)


  // Filter rooms based on activeTab
  const filteredRooms = activeTab === 'all' ? userRooms :
    activeTab === 'rooms' ? userRooms.filter(room => !room.isDirectMessage) :
      userRooms.filter(room => room.isDirectMessage);

  return (
    <div className="container mt-2 chat-app">
      <div className="row chat-container">
        {/* Rooms List */}
        <div className="col-md-3 room-list" style={{ height: '90vh', overflowY: 'auto' }}>
          <h3>Chats</h3>
          <div className="room-filters">
            {/* <button
              className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button> */}
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
            {activeTab == "rooms" && (
              filteredRooms.length > 0 ? (
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
              )
            )}

            {activeTab == "users" && (
              privateContacts.length > 0 ? (
                // privateContacts.filter(contact => contact.sender._id != user._id).map((contact) => (
                  
                //   <button
                //     key={contact.sender._id}
                //     className={`but-room ${selectedContact && selectedContact._id === contact.sender._id ? 'active' : ''}`}
                //     onClick={() => setSelectedContact(contact.sender)}
                //   >
                //     <span className="room-name">{contact.sender.name}</span>
                //     {/* {room.unreadCount > 0 && (
                //       <span className="badge bg-danger">{room.unreadCount}</span>
                //     )} */}
                //   </button>
                // ))
                [...new Map(
                  privateContacts
                    .filter(msg => msg.sender._id !== user._id ? msg.sender : msg.receiver) // pick the correct contact
                    .map(msg => {
                      const contact = msg.sender._id === user._id ? msg.receiver : msg.sender;
                      console.log("role" ,msg.sender_role)
                      return [contact._id, contact]; // use _id as key for uniqueness
                    })
                ).values()].map(contact => (
                  <button
                    key={contact._id}
                    className={`but-room ${selectedContact && selectedContact._id === contact._id ? 'active' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <span className="room-name">{contact.name}</span>
                    {/* <span> role: {contact.sender_role} </span> */}
                  </button>
                ))
              ) : (
                <div className="empty-rooms">
                  <p className="text-center">No private contacts available</p>
                </div>
              )
            )}

          </div>
        </div>

        {/* Chat Box */}
        <div className="col-md-9 chat-area  " >
          { activeTab == "rooms" && (
            selectedRoom ?
            (
              <div className="chat-content">
                <div className="chat-header">
                  <h3>
                    <span className="room-indicator"></span>
                    {selectedRoom.name}
                  </h3>
                </div>
  
                <div className="chat-box" style={{ height: '62vh', overflowY: 'auto' }}>
                  {roomMessages.length > 0 ? (
                    <div className="messages-container">
                      
                      {roomMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`d-flex mb-3 ${msg.sender_role === "Mentor" ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                          <img
                            src={msg.sender.image
                              ? `http://localhost:3000/img/users/${msg.sender.image}`
                              : '/default-avatar.png'
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-avatar.png';
                            }}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: 'cover',
                              borderRadius: '50%',
                              marginLeft: msg.sender_role === "Mentor" ? '10px' : '0',
                              marginRight: msg.sender_role !== "Mentor" ? '10px' : '0'
                            }}
                            className='img-fluid sender_img'
                            alt={`${msg.sender.name}'s avatar`}
                          />
                          <div
                            className={`message ${msg.sender_role === "Mentor" ? 'outgoing' : 'incoming'}`}
                          >
                            <div className="message-header d-flex justify-content-between gap-5">
                              <strong>{msg.sender.name}</strong>
                              <span className="message-time">
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                            <div className="message-content">{msg.content}</div>
  
                          </div>
  
  
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
                    onClick={sendRoomMessage}
                    disabled={!message.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) :
            (
              <div className="empty-state select-room">
                <div className="empty-icon">👈</div>
                <p>Select a room to start chatting</p>
              </div>
            )
          )}
          
          { activeTab == "users" && (
            selectedContact ?
            (
              <div className="chat-content">
                <div className="chat-header">
                  <h3>
                    <span className="room-indicator"></span>
                    {selectedContact.name}
                  </h3>
                </div>
  
                <div className="chat-box" style={{ height: '62vh', overflowY: 'auto' }}>
                  {privateMessages.length > 0 ? (
                    <div className="messages-container">
                      
                      {privateMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`d-flex mb-3 ${msg.sender_role === "Mentor" || msg.sender_role == "Admin" ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                          <img
                            src={msg.sender.image
                              ? `http://localhost:3000/img/users/${msg.sender.image}`
                              : '/default-avatar.png'
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-avatar.png';
                            }}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: 'cover',
                              borderRadius: '50%',
                              marginLeft: msg.sender_role === "Mentor" || msg.sender_role === "Admin" ? '10px' : '0',
                              marginRight: msg.sender_role !== "Mentor" ? '10px' : '0'
                            }}
                            className='img-fluid sender_img'
                            alt={`${msg.sender.name}'s avatar`}
                          />
                          <div
                            className={`message ${msg.sender_role === "Mentor" || msg.sender_role === "Admin" ? 'outgoing' : 'incoming'}`}
                          >
                            <div className="message-header d-flex justify-content-between gap-5">
                              <strong>{msg.sender.name}</strong>
                              <span className="message-time">
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                            <div className="message-content">{msg.content}</div>
  
                          </div>
  
  
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
                    onClick={sendPrivateMessage}
                    disabled={!message.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) :
            (
              <div className="empty-state select-room">
                <div className="empty-icon">👈</div>
                <p>Select a chat to start chatting</p>
              </div>
            )
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Chat;