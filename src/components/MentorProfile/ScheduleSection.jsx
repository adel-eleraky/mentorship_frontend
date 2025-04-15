import React from "react";
import { useSelector } from "react-redux";

const ScheduleSection = ({
  onStartInstantMeeting,
  onShowScheduleModal,
  setActiveSection,
}) => {
  const { user: mentor } = useSelector((state) => state.auth);

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
              Schedule Meeting{" "}
            </h2>
            <p className="text-muted lead mb-0">
              Dashboard / <span className="frist-color ">Schedule Meeting</span>
            </p>
          </div>
          <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0"></div>
        </div>
      </div>
      <div className="card-border">
        <div className="card-body">
          {mentor.status === "inactive" ? (
            <div className="text-center py-4">
              <div className="mb-4">
                <div
                  className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center"
                  style={{ width: 80, height: 80 }}
                >
                  <i className="fas fa-user-clock fa-2x text-warning"></i>
                </div>
              </div>
              <h4 className="second-color mb-3">
                Your Account is Pending Activation
              </h4>
              <div
                className="card border-0 shadow-sm mb-4 mx-auto"
                style={{ maxWidth: 600 }}
              >
                <div className="card-body p-4">
                  <p className="mb-3">
                    Your mentor profile is currently under review by our
                    administrators. To speed up the activation process, please
                    ensure you have:
                  </p>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item bg-transparent d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Completed your profile information
                    </li>
                    <li className="list-group-item bg-transparent d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Added your skills and expertise areas
                    </li>
                    <li className="list-group-item bg-transparent d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Uploaded a professional profile photo
                    </li>
                    <li className="list-group-item bg-transparent d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Verified your email address
                    </li>
                  </ul>
                  <div className="alert alert-info d-flex" role="alert">
                    <i className="fas fa-info-circle me-2 mt-1"></i>
                    <div>
                      Once your account is activated, you'll be able to set your
                      availability schedule and start accepting mentorship
                      requests.
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn text-white px-4"
                style={{ backgroundColor: "#118577" }}
                onClick={() => setActiveSection("personal")}
              >
                <i className="fas fa-user-edit me-2"></i>
                Complete Your Profile
              </button>
            </div>
          ) : (
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
                    <p className="mb-4">
                      Create a meeting and join immediately
                    </p>
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
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleSection;
