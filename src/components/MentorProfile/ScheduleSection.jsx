import React from "react";

const ScheduleSection = ({ onStartInstantMeeting, onShowScheduleModal }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Schedule Management</h2>
        <div className="row mb-4 ">
          {/* Instant Meeting Card */}
          <div className="col-md-6 mb-3">
            <div
              className="card bg-dark text-white h-100 "
              style={{ cursor: "pointer" }}
            >
              <div
                className="card-body p-4 text-center "
                onClick={onStartInstantMeeting}
              >
                <i className="bi bi-camera-video-fill fs-1 mb-3"></i>
                <h3 className="mb-3">Start Instant Meeting</h3>
                <p className="mb-4">Create a meeting and join immediately</p>
              </div>
            </div>
          </div>

          {/* Schedule Meeting Card */}
          <div className="col-md-6 mb-3">
            <div
              className="card bg-secondary text-white h-100"
              style={{ cursor: "pointer" }}
            >
              <div
                className="card-body p-4 text-center"
                onClick={onShowScheduleModal}
              >
                <i className="bi bi-calendar-plus fs-1 mb-3"></i>
                <h3 className="mb-3">Schedule Meeting</h3>
                <p className="mb-4">
                  Plan a meeting for a future date and time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
