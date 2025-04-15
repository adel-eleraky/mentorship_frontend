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
import OneToOne from "../components/UserProfile/OneToOne";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1115);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1115);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchUserSessions();
  }, [dispatch]);

  const fetchUserSessions = async () => {
    try {
      setSessionsLoading(true);
      setError(null);
      await dispatch(getUserSessions())
        .unwrap()
        .then((response) => {
          if (response) {
            console.log("User sessions:", response.data);
            setScheduledMeetings(response.data);
          }
        })
        .catch((error) => {
          console.error("Error in getUserSessions:", error);
          setError("Failed to load your sessions. Please try again later.");
        });
    } catch (error) {
      console.error("Error fetching user sessions:", error);
      setError(
        "Failed to load your scheduled sessions. Please try again later."
      );
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleJoinMeeting = (meetingId) => {
    window.open(`/meeting/${meetingId}`, "_blank");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div
      className={`py-2 position-relative d-flex ${
        isMobile ? "container-fluid" : "container-fluid"
      }`}
      style={{ minHeight: " 70vh", gap: "0px" }}
    >
      <ToastContainer position="bottom-right" autoClose={3000} />

      <ProfileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="mx-auto w-100 pe-3">
        {activeSection === "personal" && (
          <PersonalInfoSection userData={user} />
        )}

        {activeSection === "upcoming" && (
          <MeetingsManagement
            scheduledMeetings={scheduledMeetings.filter(
              (meeting) => new Date(meeting?.session?.schedule_time) > new Date()
            )}
            loading={sessionsLoading}
            error={error}
            onRefresh={fetchUserSessions}
            onJoinMeeting={handleJoinMeeting}
            title="Upcoming Meetings"
          />
        )}

        {activeSection === "previous" && (
          <MeetingsManagement
            scheduledMeetings={scheduledMeetings.filter(
              (meeting) => new Date(meeting?.session?.schedule_time) < new Date()
            )}
            loading={sessionsLoading}
            error={error}
            onRefresh={fetchUserSessions}
            title="Previous Meetings"
            isPast={true}
          />
        )}

        {activeSection === "recordings" && (
          <MeetingsManagement
            scheduledMeetings={scheduledMeetings.filter(
              (meeting) =>
                meeting?.session?.recordings &&
                meeting?.session?.recordings.length > 0
            )}
            loading={sessionsLoading}
            error={error}
            onRefresh={fetchUserSessions}
            title="Meeting Recordings"
            showRecordings={true}
          />
        )}

        {activeSection === "oneToOne" && <OneToOne />}
        {activeSection === "changePassword" && (
          <ChangePassword person="users" />
        )}
        {activeSection === "settings" && (
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Settings</h2>
              <p className="text-muted">Manage your account settings</p>
              {/* Settings content will go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
