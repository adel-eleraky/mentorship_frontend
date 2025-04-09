import React, { useEffect, useState } from 'react';
import axios from "axios";
import './MentorInfo.css';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
const socket = io('http://localhost:3000', {
  transports: ["websocket"], // Try forcing WebSocket transport
  withCredentials: true,
});

function MentorInfo({ mentor }) {
  const [showInput, setShowInput] = useState(false); // State to toggle input visibility
  const [message, setMessage] = useState(''); // State to store the message
  const { user } = useSelector(state => state.auth)
  const handleButtonClick = () => {
    setShowInput(!showInput); // Toggle input visibility
  };

  const handleSendMessage = () => {
    console.log(`Message to ${mentor?.name}: ${message}`);
    
    const msgData = {
      sender: user._id,
      sender_role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      receiver: mentor?._id,
      content: message,
      createdAt: new Date().toISOString()
    };

    socket.emit("send_private_msg" , msgData)
    // Add logic to send the message (e.g., API call)
    setMessage(''); // Clear the input field after sending
    setShowInput(false); // Hide the input field
  };

  return (
    <>
      <div className="container">
        <div className="mentor-cover-photo">
          <img
            src={`http://localhost:3000/img/users/${mentor?.image}`}
            alt="..."
            width={230}
            className="rounded mentor-profile-picture"
          />
        </div>
        <div className="container py-4">
          <div className="row">
            <div className="col-md-5">
              <h1 className="second-color">{mentor?.name}</h1>
              <p>{mentor?.title}</p>
              <p className="frist-color">
                <strong className="second-color">Experience:</strong> {mentor?.experience}
              </p>
              <div className="mt-4">
                <div className="mentor-info-line mentor-rating">
                  <i className="fa-solid fa-at mentor-info-icon frist-color"></i>
                  <span>{mentor?.email}</span>
                </div>
                <div className="mentor-info-line mentor-rating">
                  <i className="fas fa-star mentor-info-icon frist-color"></i>
                  <span>5.0 (25 reviews)</span>
                </div>
                <div className="mentor-info-line">
                  <i className="fas fa-clock mentor-info-icon frist-color"></i>
                  <span>{mentor?.status} this week</span>
                </div>
                <button className="btn frist-color" onClick={handleButtonClick}>
                  <i className="fa-solid fa-comment"></i> Connect with {mentor?.name}
                </button>
                {showInput && (
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="btn btn-primary edit-send mt-2" onClick={handleSendMessage}>
                      Send Message
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="skills-section">
                <h4 className="second-color">Skills</h4>
                <div className="mt-3">
                  <span className="mentor-skill-badge list-skills">Machine Learning</span>
                  <span className="mentor-skill-badge list-skills">Data Science</span>
                  <span className="mentor-skill-badge list-skills">Product Market Fit</span>
                  <span className="mentor-skill-badge list-skills">PhD Supervision</span>
                  <span className="mentor-skill-badge list-skills">Deep Learning</span>
                  <span className="more-skills">+ more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-1 mb-4 mt-2">
        <h3 className="mx-3 second-color">About :</h3>
        <div className="p-4">
          <p className="font-italic mb-0">{mentor?.bio}</p>
        </div>
      </div>
    </>
  );
}

export default MentorInfo;