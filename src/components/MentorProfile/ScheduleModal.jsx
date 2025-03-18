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

  const initialValues = {
    title: "",
    price: 0,
    description: "",
    duration: 0,
    schedule_time: "",
    has_room: false,
  };

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      // Include auth headers in the request
      const response = await axios.post(
        "http://localhost:3000/api/v1/sessions",
        {
          ...values,
        },
        { withCredentials: true }
      );

      // Pass the response data to the parent component
      onScheduleMeeting(response.data);
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
        <Modal.Title>Schedule a New Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
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
                {isSubmitting || isLoading ? "Scheduling..." : "Schedule"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ScheduleModal;
