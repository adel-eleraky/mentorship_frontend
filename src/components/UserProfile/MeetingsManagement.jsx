import React, { useState } from "react";
// import MeetingsList from "./MeetingsList";
import { formatDate } from "../../utils/dateUtils";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const MeetingsManagement = ({
  scheduledMeetings,
  error,
  onStartInstantMeeting,
}) => {


  // const { sessions } = useSelector(state => state.user )
  // what about sorting meeting to show the nearest one the first
  console.log(scheduledMeetings)

  // const sortedMeetings = scheduledMeetings.sort((a, b) => {
  //   const aDate = new Date(a.schedule_time);
  //   const bDate = new Date(b.schedule_time);
  //   return aDate - bDate;
  // });
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title mb-0">Scheduled Sessions</h2>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {scheduledMeetings.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
            <p className="lead">No scheduled sessions found</p>
            <button
              className="btn btn-outline-primary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#scheduleModal"
            >
              Book session
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
                {scheduledMeetings.map(({session}) => (
                  <tr key={session?.id}>
                    <td>{session?.title}</td>
                    <td>{formatDate(session?.schedule_time)}</td>
                    <td>{session?.duration} min</td>
                    <td>
                      <span
                        className={`badge ${session?.status === "pending"
                            ? "bg-warning"
                            : "bg-success"
                          }`}
                      >
                        {session?.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Link className="btn btn-primary" to={`/meeting/${session?._id}`}>
                          <i className="bi bi-camera-video me-2"></i>
                          Join Meeting
                        </Link>
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
