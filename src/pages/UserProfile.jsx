import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import "./css/UserProfile.css"
import ProfileNavigation from './../components/UserProfile/ProfileNavigation';
import PersonalInfoSection from '../components/UserProfile/PersonalInfoSection';
import MeetingsManagement from './../components/UserProfile/MeetingsManagement';
import { useSelector } from 'react-redux';

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth)

  // console.log(user)
  const [scheduledMeetings, setScheduledMeetings] = useState(
    [
      {
        id: "1",
        title: "React Hooks Deep Dive",
        price: 50,
        description: "A session covering advanced React hooks concepts.",
        duration: 60,
        schedule_time: "2025-07-15T10:00:00",
        status: "pending",
        has_room: false,
      },
      {
        id: "2",
        title: "JavaScript Fundamentals",
        price: 35,
        description: "Reviewing core JavaScript concepts for beginners.",
        duration: 45,
        schedule_time: "2025-07-18T14:30:00",
        status: "pending",
        has_room: false,
      },
    ]
  )
  const [activeSection, setActiveSection] = useState("personal");
  // const [userData, setUserData] = useState({
  //   name: "",
  //   title: "",
  //   email: "",
  //   about: "",
  //   expertise: [],
  //   phone: "",
  // });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    // const loadUserData = async () => {
    //   try {
    //     // For now using mock data
    //     setTimeout(() => {
    //       setUserData({
    //         name: "adel el3raky",
    //         title: "Junior web developer",
    //         about: "web developer using React and frontend technologies",
    //         expertise: ["React", "JavaScript", "Node.js"],
    //         phone: "01024715090",
    //         email: "adelkamel.developer@gmail.com"
    //       });
    //       setLoading(false);
    //     }, 1000);

    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //     setLoading(false);
    //   }
    // };


    // loadUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...mentorData,
      [name]: value,
    });
  };

  // Handle expertise tags
  const handleExpertiseChange = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newExpertise = e.target.value.trim();
      if (!userData.expertise.includes(newExpertise)) {
        setUserData({
          ...userData,
          expertise: [...userData.expertise, newExpertise],
        });
      }
      e.target.value = "";
    }
  };

  // Remove expertise tag
  const removeExpertise = (index) => {
    const updatedExpertise = [...userData.expertise];
    updatedExpertise.splice(index, 1);
    setUserData({
      ...userData,
      expertise: updatedExpertise,
    });
  };


  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">User Profile</h1>

      <ProfileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {activeSection === "personal" && (
        <PersonalInfoSection
          userData={user}
          handleInputChange={handleInputChange}
          handleExpertiseChange={handleExpertiseChange}
          removeExpertise={removeExpertise}
        />
      )}

      {activeSection === "sessions" && (
        <MeetingsManagement
          scheduledMeetings={scheduledMeetings}
          error={error}
        // onStartInstantMeeting={handleStartInstantMeeting}
        />
      )}
    </div>
  );
}

export default UserProfile
