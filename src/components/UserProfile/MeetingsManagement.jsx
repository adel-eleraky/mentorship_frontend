import React, { useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import { useSelector } from "react-redux";
import ResponsiveDialog from "../../utils/ResponsiveDialog.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetingsManagement = ({
  scheduledMeetings,
  error,
  loading,
  onRefresh,
  onJoinMeeting,
  title = "My Sessions",
  isPast = false,
  showRecordings = false,
}) => {
  // State to track which meetings have expanded recording sections
  const [expandedMeetings, setExpandedMeetings] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [content, setContent] = useState("");
  const [agreeText, setAgreeText] = useState("");
  const [disagreeText, setDisagreeText] = useState("");

  console.log("session" , scheduledMeetings)
  // Process meetings to handle nested structure
  const processedMeetings =
    scheduledMeetings && scheduledMeetings.length > 0
      ? scheduledMeetings.map((item) => {
          // Check if the meeting has a nested session structure
          if (item.session) {
            return {
              ...item.session,
              _id: item.session._id || item._id,
              mentor: item.session.mentor,
              user: item.user,
            };
          }
          // If not nested, return as is
          return item;
        })
      : [];

  // Toggle expanded state for a meeting
  const toggleExpanded = (meetingId) => {
    setExpandedMeetings((prev) => ({
      ...prev,
      [meetingId]: !prev[meetingId],
    }));
  };

  // Sort meetings to show the nearest one first
  const sortedMeetings =
    processedMeetings.length > 0
      ? processedMeetings.sort((a, b) => {
          const aDate = new Date(a.schedule_time);
          const bDate = new Date(b.schedule_time);
          return isPast ? bDate - aDate : aDate - bDate; // Reverse order for past meetings
        })
      : [];

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

      setDialogOpen(true);
      setDialogTitle("");
      setAgreeText("");
      setDisagreeText("Close");
      setContent(
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

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-success";
      case "pending":
        return "bg-warning";
      case "completed":
        return "bg-info";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <div
        className="profile-header mb-2 p-3 bg-gradient rounded-1 "
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderBottom: "3px solid white",
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-7">
            <h2 className="display-6 fw-bold second-color mb-3">{title}</h2>
            <p className="text-muted lead mb-0">
              Dashboard / Meetings /{" "}
              <span className="frist-color">{title}</span>
            </p>
          </div>
          <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
            {!isPast && !showRecordings && (
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "/mentors")}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Book New Session
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="card-border">
        <div className="card-body">
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
              <p className="mt-2">Loading your sessions...</p>
            </div>
          ) : sortedMeetings.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
              <p className="lead">
                No{" "}
                {isPast
                  ? "previous"
                  : showRecordings
                  ? "recorded"
                  : "scheduled"}{" "}
                sessions found
              </p>
              {!isPast && !showRecordings && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => (window.location.href = "/mentors")}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Book a Session
                </button>
              )}
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {sortedMeetings.map((meeting) => (
                <div className="col" key={meeting._id}>
                  <div className="card h-100 shadow-sm border-0 hover-shadow">
                    <div className="card-body">
                      <h5 className="card-title mb-3 second-color">
                        {meeting.title}
                      </h5>

                      {/* <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-person-badge frist-color me-2"></i>
                        <span>
                          Mentor:{" "}
                          {typeof meeting.mentor === "object"
                            ? meeting.mentor.name
                            : "Mentor"}
                        </span>
                      </div> */}

                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar-date frist-color me-2"></i>
                        <span>{formatDate(meeting.schedule_time)}</span>
                      </div>

                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-clock frist-color me-2"></i>
                        <span>{meeting.duration} minutes</span>
                      </div>

                      {/* Show recording badge if available */}
                      {meeting.recordings && meeting.recordings.length > 0 && (
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-camera-video text-success me-2"></i>
                          <span className="text-success">
                            {meeting.recordings.length} Recording
                            {meeting.recordings.length > 1 ? "s" : ""} Available
                          </span>
                        </div>
                      )}

                      {meeting.description && (
                        <div className="mt-3">
                          <p className="card-text text-muted small">
                            {meeting.description.length > 100
                              ? `${meeting.description.substring(0, 100)}...`
                              : meeting.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="card-footer bg-transparent border-top-0">
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn bg-second-color"
                          onClick={() => handleJoinMeeting(meeting)}
                        >
                          <i className="bi bi-camera-video-fill me-1"></i> Join
                        </button>

                        {/* Show dropdown for multiple recordings */}
                        {meeting.recordings &&
                          meeting.recordings.length > 0 && (
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-info dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="bi bi-play-circle me-1"></i>
                                Watch ({meeting.recordings.length})
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                {meeting.recordings.map((recording, index) => (
                                  <li key={index}>
                                    <a
                                      className="dropdown-item"
                                      href={recording.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Recording {index + 1}
                                      {recording.start_time &&
                                        recording.end_time && (
                                          <span className="ms-2 text-muted small">
                                            (
                                            {formatDuration(
                                              recording.start_time,
                                              recording.end_time
                                            )}
                                            )
                                          </span>
                                        )}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <ResponsiveDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={dialogTitle}
          content={content}
          agreeText={agreeText}
          disagreeText={disagreeText}
        />
      </div>
    </>
  );
};

export default MeetingsManagement;
