import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthInfo, getAuthHeaders } from "../utils/auth";
import MeetingsManagement from "../components/MentorProfile/MeetingsManagement";
import ScheduleModal from "../components/MentorProfile/ScheduleModal";
import PersonalInfoSection from "../components/MentorProfile/PersonalInfoSection";
import ScheduleSection from "../components/MentorProfile/ScheduleSection";
import JoinRoomSection from "../components/MentorProfile/JoinRoomSection";
import SettingsSection from "../components/MentorProfile/SettingsSection";
import ProfileNavigation from "../components/MentorProfile/ProfileNavigation";
import {
  fetchMentorData,
  updateMentorProfile,
} from "../rtk/features/mentorSlice";

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
  console.log(mentor);

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
  const [error, setError] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMentorData());

    const loadScheduledMeetings = async () => {
      try {
        // Mock data for now
        setScheduledMeetings([
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
        ]);

        // When API is ready:
        // const meetings = await fetchScheduledMeetings();
        // setScheduledMeetings(meetings);
      } catch (error) {
        console.error("Error fetching scheduled meetings:", error);
        setError("Failed to load scheduled meetings");
      }
    };
    loadScheduledMeetings();
  }, [dispatch]);

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
  const handleScheduleMeeting = async (meetingData) => {
    setCreateMeetingLoading(true);
    setError(null);

    try {
      // Format the date and time for the API
      const scheduleTime = new Date(`${meetingData.date}T${meetingData.time}`);

      const sessionData = {
        title: meetingData.title,
        price: meetingData.price || 0,
        description: meetingData.description,
        duration: parseInt(meetingData.duration),
        schedule_time: scheduleTime.toISOString(),
        status: "pending",
        has_room: false,
      };

      // For now, we'll just add it to the local state
      const newMeeting = {
        id: Date.now().toString(),
        ...sessionData,
      };

      setScheduledMeetings([...scheduledMeetings, newMeeting]);
      alert("Meeting scheduled successfully!");
    } catch (error) {
      console.error("Error creating meeting:", error);
      setError("Failed to schedule meeting. Please try again.");
    } finally {
      setCreateMeetingLoading(false);
    }
  };

  // Handle starting an instant meeting
  const handleStartInstantMeeting = async () => {
    try {
      setCreateMeetingLoading(true);

      // For now, simulate API response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const meetingId = `meeting-${Date.now()}`; // Temporary ID generation

      // Navigate to meeting room
      window.open(`/meeting/${meetingId}`, "_blank");
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
          error={error}
          onStartInstantMeeting={handleStartInstantMeeting}
        />
      )}

      {activeSection === "schedule" && (
        <ScheduleSection
          onStartInstantMeeting={handleStartInstantMeeting}
          onShowScheduleModal={() => setShowScheduleModal(true)}
        />
      )}

      {activeSection === "joinRoom" && <JoinRoomSection />}

      {activeSection === "settings" && <SettingsSection />}

      <ScheduleModal
        show={showScheduleModal}
        mentorId={mentor._id}
        handleClose={() => setShowScheduleModal(false)}
        onScheduleMeeting={handleScheduleMeeting}
        isLoading={createMeetingLoading}
      />
    </div>
  );
}
