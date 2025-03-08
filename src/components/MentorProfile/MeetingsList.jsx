import React from "react";

const MeetingsList = ({ meetings, type }) => {
  if (!meetings || meetings.length === 0) {
    return (
      <div className="col-12">
        <div className="alert alert-info">
          {type === "upcoming"
            ? "No upcoming meetings. Schedule one to get started!"
            : "No previous meetings found."}
        </div>
      </div>
    );
  }

  return (
    <>
      {meetings.map((meeting) => {
        const meetingDate = new Date(meeting.schedule_time);
        const formattedDate = meetingDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const formattedTime = meetingDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endTime = new Date(
          meetingDate.getTime() + meeting.duration * 60000
        ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        return (
          <div className="col-md-6 mb-4" key={meeting.id}>
            <div
              className={`card ${
                type === "upcoming" ? "bg-dark" : "bg-secondary"
              } text-white`}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar-event me-2"></i>
                  <h5 className="card-title mb-0">{meeting.title}</h5>
                </div>
                <p className="card-text mb-2">
                  {formattedDate} - {formattedTime} - {endTime}
                </p>

                {/* {meeting.description && (
                  <p className="card-text small text-muted mb-3">
                    {meeting.description}
                  </p>
                )} */}

                <div className="d-flex mt-3">
                  {/* <div className="avatar-group">
                    Placeholder for participant avatars
                    <div className="avatar avatar-sm rounded-circle bg-primary">
                      <span className="text-white">A</span>
                    </div>
                    <div className="avatar avatar-sm rounded-circle bg-info">
                      <span className="text-white">B</span>
                    </div>
                    <div className="avatar avatar-sm rounded-circle bg-success">
                      <span className="text-white">C</span>
                    </div>
                    <div className="avatar avatar-sm rounded-circle bg-warning">
                      <span className="text-white">+9</span>
                    </div>
                  </div> */}

                  {type === "upcoming" && (
                    <div className="ms-auto">
                      <button className="btn btn-primary btn-sm me-2">
                        Start
                      </button>
                      <button className="btn btn-outline-light btn-sm">
                        <i className="bi bi-clipboard me-1"></i>
                        Copy Invitation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MeetingsList;
