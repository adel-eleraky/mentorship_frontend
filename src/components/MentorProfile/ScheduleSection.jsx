import React from "react";

const ScheduleSection = ({ onStartInstantMeeting, onShowScheduleModal }) => {
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
                <h2 className="display-6 fw-bold  second-color mb-3">
                Schedule     Meeting           </h2>
                <p className="text-muted lead mb-0">
                Dashboard / <span className="frist-color ">Schedule Meeting</span>
                </p>
              </div>
              <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
              </div>
            </div>
          </div>
      <div className="card-border">
      <div className="card-body">
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
    </>
  
  );
};

export default ScheduleSection;
