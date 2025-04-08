import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router";
import "./css/UserProfile.css";
import ProfileNavigation from "./../components/UserProfile/ProfileNavigation";
import PersonalInfoSection from "../components/UserProfile/PersonalInfoSection";
import MeetingsManagement from "./../components/UserProfile/MeetingsManagement";
import { useDispatch, useSelector } from "react-redux";
import { getUserSessions } from "../rtk/features/userSlice";
import ChangePassword from "../components/MentorProfile/ChangePassword";

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getUserSessions());
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
    <div
      className=" py-4 position-relative d-flex"
      style={{ minHeight: " 70vh", gap: "10px" }}
    >
      <ProfileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="m-auto w-100 pe-3">
        <h1 className="mb-4">User Profile</h1>
        {activeSection === "personal" && (
          <PersonalInfoSection
            userData={user}
            handleInputChange={handleInputChange}
            handleExpertiseChange={handleExpertiseChange}
            removeExpertise={removeExpertise}
          />
        )}

        {activeSection === "sessions" && (
          <MeetingsManagement scheduledMeetings={sessions} error={error} />
        )}
        {activeSection === "changePassword" && (
          <ChangePassword person="users" />
        )}
      </div>
    </div>
  );
}

export default UserProfile;
