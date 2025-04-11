import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword({ person }) {
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema
  const passwordSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("New password is required"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  // Initial values
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm, setFieldError }) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/${person}/update-password`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmedPassword: values.confirmedPassword,
        },
        { withCredentials: true }
      );

      toast.success("Password updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error updating password:", error);

      // Handle validation errors from the backend
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((field) => {
          setFieldError(field, errors[field]);
        });
      } else {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to update password. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
         <div
            className="profile-header mb-1 p-3 bg-gradient rounded-1 "
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              borderBottom: "3px solid white",
            }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-7">
                <h2 className="display-6 fw-bold  second-color mb-3">
                Change Password
                </h2>
                <p className="text-muted lead mb-0">
                Dashboard / <span className="frist-color ">Change Password </span>
                </p>
              </div>
              <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
              </div>
            </div>
          </div>

        <div className=" card-border ">
      <div className="card-body">
      

        <Formik
          initialValues={initialValues}
          validationSchema={passwordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label second-color">
                  Current Password
                </label>
                <Field
                  type="password"
                  className={`form-control ${
                    errors.oldPassword && touched.oldPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  id="oldPassword"
                  name="oldPassword"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label second-color">
                  New Password
                </label>
                <Field
                  type="password"
                  className={`form-control ${
                    errors.newPassword && touched.newPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  id="newPassword"
                  name="newPassword"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmedPassword" className="form-label second-color">
                  Confirm New Password
                </label>
                <Field
                  type="password"
                  className={`form-control ${
                    errors.confirmedPassword && touched.confirmedPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  id="confirmedPassword"
                  name="confirmedPassword"
                />
                <ErrorMessage
                  name="confirmedPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn  bg-second-color"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>

  );
}
