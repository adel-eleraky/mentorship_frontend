import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveDialog from "../../utils/ResponsiveDialog.jsx";
import "./OneToOne.css";

const OneToOne = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [content, setContent] = useState("");
  const [agreeText, setAgreeText] = useState("Yes");
  const [disagreeText, setDisagreeText] = useState("No");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  // Add a new effect to check and update session statuses
  useEffect(() => {
    const checkAndUpdateSessionStatuses = () => {
      const currentTime = new Date();

      requests.forEach((request) => {
        if (request.status === "pending" || request.status === "accepted") {
          const scheduleTime = new Date(request.schedule_time);
          // Check if more than 1 hour has passed since the scheduled time
          const hoursPassed = (currentTime - scheduleTime) / (1000 * 60 * 60);

          if (hoursPassed > 1) {
            handleStatusUpdate(request._id, "completed");
          }
        }
      });
    };

    // Run the check when requests change
    if (requests.length > 0) {
      checkAndUpdateSessionStatuses();
    }

    // Also set up an interval to check periodically (every 5 minutes)
    const intervalId = setInterval(
      checkAndUpdateSessionStatuses,
      5 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [requests]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/oneTo1sessions/mentor/requests",
        {
          withCredentials: true,
        }
      );
      setRequests(response.data.data);
      setError(null);
    } catch (err) {
      setError(
        "Failed to load one-to-one session requests. Please try again later."
      );
      console.error("Error fetching one-to-one requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/oneTo1sessions/request/${requestId}/status`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );

      // Update local state
      setRequests(
        requests.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      setError("Failed to update request status. Please try again.");
      console.error("Error updating request status:", err);
    }
  };

  const handleAcceptRequest = (requestId) => {
    setSelectedRequestId(requestId);
    setDialogTitle("Accept Request");
    setContent(
      "Are you sure you want to accept this one-to-one session request?"
    );
    setAgreeText("Accept");
    setDisagreeText("Cancel");
    setDialogOpen(true);
  };

  const handleRejectRequest = (requestId) => {
    setSelectedRequestId(requestId);
    setDialogTitle("Reject Request");
    setContent(
      "Are you sure you want to reject this one-to-one session request?"
    );
    setAgreeText("Reject");
    setDisagreeText("Cancel");
    setDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (dialogTitle.includes("Accept")) {
      handleStatusUpdate(selectedRequestId, "accepted");
    } else if (dialogTitle.includes("Reject")) {
      handleStatusUpdate(selectedRequestId, "rejected");
    }
    setDialogOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-warning text-dark";
      case "accepted":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "completed":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  const handleJoinMeeting = (meeting) => {
    const meetingTime = new Date(meeting.schedule_time || meeting.createdAt);
    const currentTime = new Date();

    // Check if meeting time is within 15 minutes of scheduled time (either before or after)
    const timeDiff = Math.abs(meetingTime - currentTime) / (1000 * 60); // difference in minutes

    if (meeting.status === "active" || timeDiff <= 15) {
      // If meeting is active or within the time window, join it
      window.open(`/meeting/${meeting._id}`, "_blank");
    } else {
      // Calculate time remaining
      const timeRemaining = formatTimeRemaining(meetingTime, currentTime);

      setDialogOpen(true);
      setDialogTitle("");
      setAgreeText("");
      setDisagreeText("Close");
      setContent(
        `This session is scheduled for ${new Date(
          meeting.schedule_time
        ).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })} at ${new Date(meeting.schedule_time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}.\n\n${timeRemaining}\n\nYou can join the meeting 15 minutes before the scheduled time.`
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

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((req) => req.status.toLowerCase() === statusFilter);

  return (
    <>
      <div
        className="profile-header mb-2 p-3 bg-gradient rounded-1 "
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderBottom: "3px solid white",
        }}
      >
        <h2 className="card-title">One to One Sessions</h2>
        <div className="row mb-3">
          <div className="col-12">
            <p className="text-muted lead mb-0">Dashboard / One-to-One</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="filter-buttons">
              {["all", "pending", "accepted", "completed", "rejected"].map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    className={`filter-btn ${
                      statusFilter === status ? "active" : ""
                    }`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
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
              <p className="mt-2">Loading session requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
              <p className="lead">
                No {statusFilter !== "all" ? statusFilter : ""} session requests
                found
              </p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredRequests.map((request) => (
                <div className="col" key={request._id}>
                  <div className="card h-100 shadow-sm border-0 hover-shadow">
                    <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                      <span
                        className={`badge ${getStatusBadgeClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mb-3 second-color">
                        {request.title}
                      </h5>

                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-person frist-color me-2"></i>
                        <span>From: {request.user?.name || "User"}</span>
                      </div>

                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar-date frist-color me-2"></i>
                        <span>
                          Requested:{" "}
                          {request.schedule_time
                            ? new Date(
                                request.schedule_time
                              ).toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                              })
                            : "N/A"}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-clock frist-color me-2"></i>
                        <span>
                          Time: {request.requested_time?.time || "N/A"}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar-check frist-color me-2"></i>
                        <span>Created: {formatDate(request.createdAt)}</span>
                      </div>

                      {request.description && (
                        <div className="mt-3">
                          <p className="card-text text-muted small">
                            {request.description.length > 100
                              ? `${request.description.substring(0, 100)}...`
                              : request.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="card-footer bg-transparent border-top-0">
                      {request.status === "pending" && (
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-success"
                            onClick={() => handleAcceptRequest(request._id)}
                          >
                            <i className="bi bi-check-circle me-1"></i> Accept
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRejectRequest(request._id)}
                          >
                            <i className="bi bi-x-circle me-1"></i> Reject
                          </button>
                        </div>
                      )}
                      {request.status === "accepted" && (
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn bg-second-color"
                            onClick={() => handleJoinMeeting(request)}
                          >
                            <i className="bi bi-camera-video-fill me-1"></i>{" "}
                            Join Meeting
                          </button>
                        </div>
                      )}
                      {request.status === "completed" &&
                        request.recordings &&
                        request.recordings.length > 0 && (
                          <div className="d-flex justify-content-center">
                            <div className="dropdown w-100">
                              <button
                                className="btn btn-outline-info dropdown-toggle w-100"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="bi bi-play-circle me-1"></i>
                                Watch Recordings ({request.recordings.length})
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end w-100">
                                {request.recordings.map((recording, index) => (
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
                          </div>
                        )}
                      {request.status === "completed" &&
                        (!request.recordings ||
                          request.recordings.length === 0) && (
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-outline-secondary"
                              disabled
                            >
                              <i className="bi bi-camera-video-off me-1"></i> No
                              Recordings Available
                            </button>
                          </div>
                        )}
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
          onAgree={handleConfirmAction}
          title={dialogTitle}
          content={content}
          agreeText={agreeText}
          disagreeText={disagreeText}
        />
      </div>
    </>
  );
};

export default OneToOne;
