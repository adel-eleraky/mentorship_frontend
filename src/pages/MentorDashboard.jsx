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
  const [meetingToEdit, setMeetingToEdit] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1115);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1115);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        console.log(scheduledMeetings);
        updateSessionStatus(response.data.data);
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
        toast.success(
          meetingToEdit
            ? "Meeting updated successfully!"
            : "Meeting scheduled successfully!"
        );
      } else {
        throw new Error("No data received from the server");
      }
    } catch (error) {
      console.error("Error processing meeting data:", error);
      setError("Failed to schedule meeting. Please try again.");
    }
  };

  // Handle showing schedule modal with optional meeting data for editing
  const handleShowScheduleModal = (meetingData = null) => {
    setMeetingToEdit(meetingData);
    setShowScheduleModal(true);
  };

  // Handle starting an instant meeting
  const handleStartInstantMeeting = async () => {
    try {
      setCreateMeetingLoading(true);
      setError(null);
      const meetingId = mentor._id;
      window.open(`/meeting/${meetingId}`, "_blank");
      fetchMentorSessions();
    } catch (error) {
      console.error("Error creating instant meeting:", error);
      setError("Failed to create instant meeting. Please try again.");
      alert("Failed to create meeting room. Please try again.");
    } finally {
      setCreateMeetingLoading(false);
    }
  };
  const updateSessionStatus = async (meetings = scheduledMeetings) => {
    try {
      const updatedMeetings = meetings.map((meeting) => {
        const currentTime = new Date();
        const meetingTime = new Date(meeting.schedule_time);
        let status;
        if (meetingTime > currentTime) {
          status = "pending";
        } else if (
          meetingTime.getTime() + meeting.duration * 60000 <
          currentTime.getTime()
        ) {
          status = "completed";
        } else {
          status = "active";
        }

        return { ...meeting, status };
      });

      console.log(updatedMeetings);
      setScheduledMeetings(updatedMeetings);

      // Update each session individually
      for (const meeting of updatedMeetings) {
        const response = await axios.put(
          `http://localhost:3000/api/v1/mentors/sessions/${meeting._id}`,
          { status: meeting.status },
          { withCredentials: true }
        );
        console.log(
          `Session ${meeting._id} updated with status:`,
          response.data
        );
      }
    } catch (updateError) {
      console.error("Error updating session with status:", updateError);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div
      className={`py-4 position-relative d-flex ${
        isMobile ? "container-fluid" : "container"
      }`}
      style={{ minHeight: " 70vh", gap: "10px" }}
    >
      <ToastContainer position="bottom-right" autoClose={3000} />

      <ProfileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="mx-auto w-100 pe-3">
        {/* <h1 className="mb-4">Mentor Profile</h1> */}

        {activeSection === "personal" && (
          <PersonalInfoSection
            mentorData={mentor}
            loading={loading}
            message={message}
          />
        )}

        {activeSection === "upcoming" && (
          <MeetingsManagement
            scheduledMeetings={scheduledMeetings.filter(
              (meeting) => new Date(meeting.schedule_time) > new Date()
            )}
            loading={sessionsLoading}
            error={error}
            onStartInstantMeeting={handleStartInstantMeeting}
            onRefresh={fetchMentorSessions}
            onShowScheduleModal={handleShowScheduleModal}
            title="Upcoming Meetings"
          />
        )}

        {activeSection === "previous" && (
          <MeetingsManagement
            scheduledMeetings={scheduledMeetings.filter(
              (meeting) => new Date(meeting.schedule_time) < new Date()
            )}
            loading={sessionsLoading}
            error={error}
            onRefresh={fetchMentorSessions}
            onShowScheduleModal={handleShowScheduleModal}
            title="Previous Meetings"
            isPast={true}
          />
        )}

        {activeSection === "recordings" && (
          <MeetingsManagement
            scheduledMeetings={scheduledMeetings.filter(
              (meeting) => meeting.recordings && meeting.recordings.length > 0
            )}
            loading={sessionsLoading}
            error={error}
            onRefresh={fetchMentorSessions}
            title="Meeting Recordings"
            showRecordings={true}
          />
        )}

        {activeSection === "schedule" && (
          <ScheduleSection
            onStartInstantMeeting={handleStartInstantMeeting}
            onShowScheduleModal={handleShowScheduleModal}
          />
        )}

        {activeSection === "joinRoom" && <JoinRoomSection />}
        {activeSection === "changePassword" && (
          <ChangePassword person="mentors" />
        )}
        {activeSection === "settings" && <SettingsSection />}
        <ScheduleModal
          show={showScheduleModal}
          mentorId={mentor?._id}
          handleClose={() => {
            setShowScheduleModal(false);
            setMeetingToEdit(null);
          }}
          onScheduleMeeting={handleScheduleMeeting}
          isLoading={createMeetingLoading}
          meetingData={meetingToEdit}
        />
      </div>
    </div>
  );
}
