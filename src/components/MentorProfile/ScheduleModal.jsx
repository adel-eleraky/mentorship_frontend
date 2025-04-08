import React from "react";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";

const ScheduleModal = ({
  show,
  handleClose,
  onScheduleMeeting,
  isLoading,
  mentorId,
  meetingData,
}) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title cannot exceed 100 characters")
      .required("Title is required"),
    price: Yup.number()
      .min(0, "Price cannot be negative")
      .required("Price is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters long")
      .max(500, "Description cannot exceed 500 characters")
      .required("Description is required"),
    duration: Yup.number()
      .min(30, "Duration must be at least 30 minute")
      .required("Duration is required"),
    schedule_time: Yup.date().required("Schedule time is required"),
    has_room: Yup.boolean().required("Has room is required"),
  });

  // Set initial values based on whether we're editing or creating
  const getInitialValues = () => {
    if (meetingData && meetingData._id) {
      // Format the date for the datetime-local input
      const scheduleDate = meetingData.schedule_time
        ? new Date(meetingData.schedule_time)
        : new Date();

      const formattedDate = scheduleDate.toISOString().slice(0, 16);

      return {
        title: meetingData.title || "",
        price: meetingData.price || 0,
        description: meetingData.description || "",
        duration: meetingData.duration || 30,
        schedule_time: formattedDate,
        has_room: meetingData.has_room || false,
      };
    }

    return {
      title: "",
      price: "",
      description: "",
      duration: 30,
      schedule_time: "",
      has_room: false,
    };
  };

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      let response;

      if (meetingData && meetingData._id) {
        // Update existing meeting
        response = await axios.put(
          `http://localhost:3000/api/v1/mentors/sessions/${meetingData._id}`,
          {
            ...values,
          },
          { withCredentials: true }
        );
      } else {
        // Create new meeting
        response = await axios.post(
          "http://localhost:3000/api/v1/sessions",
          {
            ...values,
          },
          { withCredentials: true }
        );
      }

      onScheduleMeeting(response.data);
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error scheduling session:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {meetingData && meetingData._id
            ? "Edit Session"
            : "Schedule a New Session"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  }
                />
              </div>

              <div className="mb-3">
                <Field
                  name="price"
                  as={TextField}
                  label="Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  }
                />
              </div>

              <div className="mb-3">
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  }
                />
              </div>

              <div className="mb-3">
                <Field
                  name="duration"
                  as={TextField}
                  label="Duration (minutes)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="text-danger"
                    />
                  }
                />
              </div>

              <div className="mb-3">
                <Field
                  name="schedule_time"
                  as={TextField}
                  label="Schedule Time"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="schedule_time"
                      component="div"
                      className="text-danger"
                    />
                  }
                />
              </div>

              <div className="mb-3">
                <FormControlLabel
                  control={
                    <Field
                      name="has_room"
                      as={Checkbox}
                      color="primary"
                      type="checkbox"
                    />
                  }
                  label="Has Room"
                />
                <ErrorMessage
                  name="has_room"
                  component="div"
                  className="text-danger"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading
                  ? meetingData && meetingData._id
                    ? "Updating..."
                    : "Scheduling..."
                  : meetingData && meetingData._id
                  ? "Update Session"
                  : "Schedule Session"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ScheduleModal;
