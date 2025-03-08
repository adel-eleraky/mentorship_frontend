import React, { useState } from "react";
import MeetingsList from "./MeetingsList";
import { formatDate } from "../../utils/dateUtils";

const MeetingsManagement = ({
  scheduledMeetings,
  error,
  onStartInstantMeeting,
}) => {
  // what about sorting meeting to show the nearest one the first

  const sortedMeetings = scheduledMeetings.sort((a, b) => {
    const aDate = new Date(a.schedule_time);
    const bDate = new Date(b.schedule_time);
    return aDate - bDate;
  });
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title mb-0">Scheduled Meetings</h2>
          <button className="btn btn-primary" onClick={onStartInstantMeeting}>
            <i className="bi bi-camera-video me-2"></i>
            Start Instant Meeting
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {scheduledMeetings.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
            <p className="lead">No scheduled meetings found</p>
            <button
              className="btn btn-outline-primary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#scheduleModal"
            >
              Schedule a Meeting
            </button>
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
                  <tr key={meeting.id}>
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
                          disabled={meeting.status !== "active"}
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
