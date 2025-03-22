import React, { useState } from "react";
import MeetingsList from "./MeetingsList";
import { formatDate } from "../../utils/dateUtils";
import { deleteMentorSessions } from "../../services/mentorService";

const MeetingsManagement = ({
  scheduledMeetings,
  error,
  loading,
  onRefresh,
}) => {
  // Sort meetings to show the nearest one first
  const sortedMeetings = scheduledMeetings.sort((a, b) => {
    const aDate = new Date(a.schedule_time);
    const bDate = new Date(b.schedule_time);
    return aDate - bDate;
  });
  const handleDeleteMeeting = async (meetingId) => {
    try {
      await deleteMentorSessions(meetingId);

      onRefresh();

      alert("Meeting deleted successfully.");
    } catch (error) {
      console.error("Error deleting meeting:", error);
      alert("Failed to delete meeting. Please try again.");
    }
  };

  // Handle joining a meeting
  const handleJoinMeeting = (meeting) => {
    const meetingTime = new Date(meeting.schedule_time);
    const currentTime = new Date();

    // Check if meeting time is within 15 minutes of scheduled time (either before or after)
    const timeDiff = Math.abs(meetingTime - currentTime) / (1000 * 60); // difference in minutes

    if (meeting.status === "active" || timeDiff <= 15) {
      // If meeting is active or within the time window, join it
      window.open(`/meeting/${meeting._id || meeting.id}`, "_blank");
    } else {
      // Calculate time remaining
      const timeRemaining = formatTimeRemaining(meetingTime, currentTime);

      // Show alert with time information
      alert(
        `This session is scheduled for ${formatDate(
          meeting.schedule_time
        )}.\n\n${timeRemaining}\n\nYou can join the meeting 15 minutes before the scheduled time.`
      );
    }
  };

  // Helper function to format time remaining message
  const formatTimeRemaining = (meetingTime, currentTime) => {
    if (meetingTime < currentTime) {
      return "This meeting has already passed.";
    }

    const diffMs = meetingTime - currentTime;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let timeMessage = "Time remaining: ";
    if (diffDays > 0) {
      timeMessage += `${diffDays} day${diffDays > 1 ? "s" : ""}, `;
    }
    if (diffHrs > 0 || diffDays > 0) {
      timeMessage += `${diffHrs} hour${diffHrs > 1 ? "s" : ""}, `;
    }
    timeMessage += `${diffMins} minute${diffMins > 1 ? "s" : ""}`;

    return timeMessage;
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title mb-0">Scheduled Meetings</h2>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your meetings...</p>
          </div>
        ) : scheduledMeetings.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
            <p className="lead">No scheduled meetings found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedMeetings.map((meeting) => (
                  <tr key={meeting.id || meeting._id}>
                    <td>{meeting.title}</td>
                    <td>{formatDate(meeting.schedule_time)}</td>
                    <td>{meeting.duration} min</td>
                    <td>
                      <span
                        className={`badge ${
                          meeting.status === "pending"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {meeting.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          title="Join meeting"
                          onClick={() => handleJoinMeeting(meeting)}
                        >
                          <i className="bi bi-camera-video"></i>
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          title="Edit meeting"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          title="Cancel meeting"
                          onClick={() =>
                            handleDeleteMeeting(meeting._id || meeting.id)
                          }
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingsManagement;
