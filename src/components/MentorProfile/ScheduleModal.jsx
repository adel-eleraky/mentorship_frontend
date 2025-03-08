import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-styles.css";

const ScheduleModal = ({ onScheduleMeeting, isLoading }) => {
  const [meetingData, setMeetingData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "30",
    price: "0",
    dateTime: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({
      ...meetingData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    if (date) {
      // Extract date and time parts for the API
      const dateString = date.toISOString().split("T")[0];
      const timeString = date.toTimeString().split(" ")[0].substring(0, 5);

      setMeetingData({
        ...meetingData,
        date: dateString,
        time: timeString,
        dateTime: date,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onScheduleMeeting(meetingData);

    // Reset form
    setMeetingData({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "30",
      price: "0",
      dateTime: null,
    });

    // Close modal
    document.querySelector('#scheduleModal [data-bs-dismiss="modal"]').click();
  };

  return (
    <div
      className="modal fade"
      id="scheduleModal"
      tabIndex="-1"
      aria-labelledby="scheduleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "22rem",
          margin: "0 auto"
        }}
      >
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-0">
            <h5 className="modal-title" id="scheduleModalLabel">
              Create Meeting
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="scheduleForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Meeting Title
                </label>
                <input
                  type="text"
                  className="form-control text-white border-secondary"
                  style={{
                    backgroundColor: "#343a40",
                  }}
                  id="title"
                  name="title"
                  value={meetingData.title}
                  onChange={handleInputChange}
                  placeholder="Enter meeting title"
                  required
                />
              </div>


              <div className="mb-3">
                <label className="form-label">Select Date & Time</label>
                <DatePicker
                  selected={meetingData.dateTime}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="form-control text-white border-secondary"
                  style={{
                    backgroundColor: "#343a40",
                  }}
                  placeholderText="Click to select date and time"
                  required
                  wrapperClassName="w-100"
                  popperClassName="date-picker-popper"
                  customInput={
                    <input
                      style={{
                        backgroundColor: "#343a40",
                        color: "white",
                      }}
                    />
                  }
                />
              </div>

              <div className="d-grid gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#0d6efd",
                    borderColor: "#0d6efd"
                  }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating...
                    </>
                  ) : (
                    "Create Meeting"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
