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
  // State to track which meetings have expanded recording sections
  const [expandedMeetings, setExpandedMeetings] = useState({});

  // Toggle expanded state for a meeting
  const toggleExpanded = (meetingId) => {
    setExpandedMeetings((prev) => ({
      ...prev,
      [meetingId]: !prev[meetingId],
    }));
  };

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

  // Format recording duration
  const formatDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "Unknown duration";

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;

    const minutes = Math.floor(durationMs / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    return `${minutes}m ${seconds}s`;
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
                  <React.Fragment key={meeting.id || meeting._id}>
                    <tr>
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

                          <button
                            className="btn btn-outline-info"
                            title="View Recordings"
                            disabled={
                              !meeting.recordings ||
                              meeting.recordings.length === 0
                            }
                            onClick={() =>
                              toggleExpanded(meeting._id || meeting.id)
                            }
                          >
                            <i className="bi bi-film"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Recordings section - shown when expanded */}
                    {meeting.recordings &&
                      meeting.recordings.length > 0 &&
                      expandedMeetings[meeting._id || meeting.id] && (
                        <tr>
                          <td colSpan="5" className="p-0">
                            <div className="bg-light p-3 border-top">
                              <h6 className="mb-3">
                                <i className="bi bi-collection-play me-2"></i>
                                Session Recordings
                              </h6>
                              <div className="row row-cols-1 row-cols-md-2 g-3">
                                {meeting.recordings.map((recording, index) => (
                                  <div className="col" key={index}>
                                    <div className="card h-100 shadow-sm">
                                      <div className="card-body">
                                        <h6 className="card-title text-truncate">
                                          Recording {index + 1}
                                        </h6>
                                        <p className="card-text small mb-1">
                                          <i className="bi bi-clock me-1"></i>
                                          {formatDate(recording.start_time)}
                                        </p>
                                        <p className="card-text small mb-2">
                                          <i className="bi bi-stopwatch me-1"></i>
                                          {formatDuration(
                                            recording.start_time,
                                            recording.end_time
                                          )}
                                        </p>
                                      </div>
                                      <div className="card-footer bg-transparent border-top-0">
                                        <a
                                          href={recording.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="btn btn-sm btn-primary w-100"
                                        >
                                          <i className="bi bi-play-fill me-1"></i>
                                          Watch Recording
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
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
