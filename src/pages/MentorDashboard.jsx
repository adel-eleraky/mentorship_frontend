import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MeetingsManagement from "../components/MentorProfile/MeetingsManagement";
import ScheduleModal from "../components/MentorProfile/ScheduleModal";
import PersonalInfoSection from "../components/MentorProfile/PersonalInfoSection";
import ScheduleSection from "../components/MentorProfile/ScheduleSection";
import JoinRoomSection from "../components/MentorProfile/JoinRoomSection";
import SettingsSection from "../components/MentorProfile/SettingsSection";
import ProfileNavigation from "../components/MentorProfile/ProfileNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchMentorData,
  updateMentorProfile,
} from "../rtk/features/mentorSlice";
import { Call } from "@stream-io/video-react-sdk";
import ChangePassword from "../components/MentorProfile/ChangePassword";

export default function MentorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: mentor,
    loading,
    errors,
    message,
    status,
  } = useSelector((state) => state.auth);

  const [mentorData, setMentorData] = useState({
    name: mentor?.data?.name || "",
    title: mentor?.data?.title || "",
    bio: mentor?.data?.bio || "",
    skills: mentor?.data?.skills || [],
    email: mentor?.data?.email || "",
    phone: mentor?.data?.phone || "",
  });
  const [activeSection, setActiveSection] = useState("personal");
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [createMeetingLoading, setCreateMeetingLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Fetch mentor data and sessions
  useEffect(() => {
    dispatch(fetchMentorData());
    fetchMentorSessions();
  }, [dispatch]);

  // Fetch sessions from the API
  const fetchMentorSessions = async () => {
    try {
      setSessionsLoading(true);
      setError(null);
      console.log(mentor._id);
      const response = await axios.get(
        `http://localhost:3000/api/v1/mentors/${mentor._id}/sessions`,
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        setScheduledMeetings(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching mentor sessions:", error);
      setError(
        "Failed to load your scheduled sessions. Please try again later."
      );
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    if (mentor?.data) {
      setMentorData({
        name: mentor.data.name,
        title: mentor.data.title,
        bio: mentor.data.bio,
        skills: mentor.data.skills,
        email: mentor.data.email,
        phone: mentor.data.phone,
      });
    }
  }, [mentor]);

  // Handle scheduling a new meeting
  const handleScheduleMeeting = async (responseData) => {
    setCreateMeetingLoading(false);
    setError(null);

    try {
      if (responseData && responseData.data) {
        // Refresh the sessions list instead of manually adding
        fetchMentorSessions();
        // alert("Meeting scheduled successfully!");
        toast.success("Meeting scheduled successfully!");
      } else {
        throw new Error("No data received from the server");
      }
    } catch (error) {
      console.error("Error processing meeting data:", error);
      setError("Failed to schedule meeting. Please try again.");
    }
  };

  // Handle starting an instant meeting
  const handleStartInstantMeeting = async () => {
    try {
      setCreateMeetingLoading(true);
      setError(null);
      // Create an instant session via API
      // const response = await axios.post(
      //   "http://localhost:3000/api/v1/sessions/instant",
      //   {
      //     title: "Instant Session",
      //     description: "Instant mentoring session",
      //     duration: 60, // Default duration in minutes
      //   },
      //   { withCredentials: true }
      // );
      // if (response.data && response.data.data) {
      //   const meetingId = response.data.data.id || response.data.data._id;
      const meetingId = mentor._id;
      // Navigate to meeting room
      window.open(`/meeting/${meetingId}`, "_blank");
      // Refresh sessions list
      fetchMentorSessions();
      // } else {
      //   throw new Error("Failed to create instant meeting");
      // }
    } catch (error) {
      console.error("Error creating instant meeting:", error);
      setError("Failed to create instant meeting. Please try again.");
      alert("Failed to create meeting room. Please try again.");
    } finally {
      setCreateMeetingLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container my-4">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h1 className="mb-4">Mentor Profile</h1>

      <ProfileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {activeSection === "personal" && (
        <PersonalInfoSection
          mentorData={mentor}
          loading={loading}
          message={message}
        />
      )}

      {activeSection === "meetings" && (
        <MeetingsManagement
          scheduledMeetings={scheduledMeetings}
          loading={sessionsLoading}
          error={error}
          onStartInstantMeeting={handleStartInstantMeeting}
          onRefresh={fetchMentorSessions}
        />
      )}

      {activeSection === "schedule" && (
        <ScheduleSection
          onStartInstantMeeting={handleStartInstantMeeting}
          onShowScheduleModal={() => setShowScheduleModal(true)}
        />
      )}

      {activeSection === "joinRoom" && <JoinRoomSection />}
      {activeSection === "changePassword" && <ChangePassword />}
      {activeSection === "settings" && <SettingsSection />}

      <ScheduleModal
        show={showScheduleModal}
        mentorId={mentor?._id}
        handleClose={() => setShowScheduleModal(false)}
        onScheduleMeeting={handleScheduleMeeting}
        isLoading={createMeetingLoading}
      />
    </div>
  );
}
