import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveDialog from "../../utils/ResponsiveDialog.jsx";

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
      default:
        return "bg-secondary";
    }
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
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-7">
            <p className="text-muted lead mb-0">Dashboard / One-to-One</p>
          </div>
          <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${
                  statusFilter === "all" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`btn ${
                  statusFilter === "pending"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </button>
              <button
                type="button"
                className={`btn ${
                  statusFilter === "accepted"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setStatusFilter("accepted")}
              >
                Accepted
              </button>
              <button
                type="button"
                className={`btn ${
                  statusFilter === "rejected"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setStatusFilter("rejected")}
              >
                Rejected
              </button>
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
                          Requested: {request.requested_time?.day || "N/A"}
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
                            onClick={() => {
                              /* Handle scheduling or communication */
                            }}
                          >
                            <i className="bi bi-calendar-plus me-1"></i>{" "}
                            Schedule
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
