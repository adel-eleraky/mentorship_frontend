import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateMentorProfile } from "../../rtk/features/mentorSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalInfoSection = ({ mentorData, message }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.mentor);
  const [activeTab, setActiveTab] = useState("basic");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters long")
      .max(30, "Full Name cannot exceed 30 characters")
      .matches(
        /^[a-zA-Z0-9_ ]+$/,
        "Full Name can only contain letters, numbers, and underscores"
      )
      .required("Full Name is required"),

    email: Yup.string()
      .email("Please enter a valid email address (e.g., user@example.com)")
      .required("Email is required"),

    phone: Yup.string()
      .length(11, "Phone number must be 11 characters long")
      .required("Phone number is required"),

    title: Yup.string()
      .min(3, "Professional Title must be at least 3 characters long")
      .max(30, "Professional Title cannot exceed 30 characters")
      .required("Professional Title is required"),

    bio: Yup.string()
      .min(20, "Bio must be at least 20 characters long")
      .max(500, "Bio cannot exceed 500 characters")
      .required("Bio is required"),

    skills: Yup.array()
      .of(Yup.string().trim().required("skills cannot be empty"))
      .min(1, "At least one skills is required")
      .required("skills is required"),
  });

  const initialValues = {
    name: mentorData.name || "",
    title: mentorData.title || "",
    bio: mentorData.bio || "",
    skills: mentorData.skills || [],
    email: mentorData.email || "",
    phone: mentorData.phone || "",
  };

  const submitHandler = (values) => {
    dispatch(updateMentorProfile(values))
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update profile. Please try again.");
      });
  };

  return (
    <div className="personal-info-container">
      <div
        className="profile-header mb-4 p-3 bg-gradient rounded-1 "
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderBottom: "3px solid white",
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-7">
            <h2 className="display-6 fw-bold  second-color mb-3">
              Personal Information
            </h2>
            <p className="text-muted lead mb-0">
              Manage your profile details and expertise
            </p>
          </div>
          <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
            <div
              className="position-relative d-flex align-items-center justify-content-center m-auto"
              style={{ overflow: "hidden", width: "120px", height: "120px" }}
            >
              <img
                src={
                  // mentorData.profileImage || "https://via.placeholder.com/150"
                  "https://picsum.photos/150/150"
                }
                alt="Profile"
                className="rounded-circle profile-image shadow-lg"
                style={{
                  maxWidth: "120px",
                  maxHeight: "120px",
                  objectFit: "cover",
                  border: "5px solid white",
                  marginBottom:"4px",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />

              <Formik
              // initialValues={{ image: null }}
              // validationSchema={ImageUploadSchema}
              // onSubmit={handleImageUpload}
              >
                {({ setFieldValue, errors, touched }) => (
                  <Form encType="multipart/form-data">
                    <span
                      className="position-absolute mt-2 border border-white shadow d-flex align-items-center justify-content-center"
                      style={{
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor:"#118577",
                        maxHeight: "40px",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.getElementById("profile-image-upload").click()
                      }
                    >
                      <i className="bi bi-pencil-fill text-white"></i>
                      <input
                        type="file"
                        id="profile-image-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 card-border  overflow-hidden">
        <div className="card-header bg-white card-border p-0 border-bottom-0">
          <ul className="nav nav-pills nav-fill p-2">
            <li className="nav-item mx-1">
              <button
                className={`nav-link px-1 py-2 ${
                  activeTab === "basic"
                    ? "active bg-second-color text-white"
                    : " text-black border border-secondary"
                }`}
                style={{
                  backgroundColor:
                    activeTab === "basic" ? "#118577" : "#f8f9fa",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setActiveTab("basic")}
                onMouseEnter={(e) => {
                  if (activeTab !== "basic") {
                    e.currentTarget.style.backgroundColor = "#118577";

                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "basic") {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }
                }}
              >
                <i className="bi bi-person-badge me-2"></i>
                Basic Info
              </button>
            </li>
            <li className="nav-item mx-1">
              <button
                className={`nav-link px-1 py-2 ${
                  activeTab === "skills"
                    ? "active  text-white"
                    : "text-dark border border-secondary"
                }`}
                style={{
                  backgroundColor:
                    activeTab === "skills" ? "#118577" : "#f8f9fa",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setActiveTab("skills")}
                onMouseEnter={(e) => {
                  if (activeTab !== "skills") {
                    e.currentTarget.style.backgroundColor = "#e2e6ea";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "skills") {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }
                }}
              >
                <i className="bi bi-tools me-2"></i>
                Skills & Expertise
              </button>
            </li>
            <li className="nav-item mx-1">
              <button
                className={`nav-link px-1 py-2 ${
                  activeTab === "contact"
                    ? "active  text-white"
                    : "text-dark border border-secondary"
                }`}
                style={{
                  backgroundColor:
                    activeTab === "contact" ? "#118577" : "#f8f9fa",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setActiveTab("contact")}
                onMouseEnter={(e) => {
                  if (activeTab !== "contact") {
                    e.currentTarget.style.backgroundColor = "#e2e6ea";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "contact") {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }
                }}
              >
                <i className="bi bi-envelope me-2"></i>
                Contact Details
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body p-4">
          <ToastContainer position="bottom-right" autoClose={3000} />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* Basic Info Tab */}
                <div
                  className={activeTab === "basic" ? "d-block" : "d-none"}
                  style={{ padding: "20px" }}
                >
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                        />
                        <label htmlFor="name">
                          <i className="bi bi-person frist-color me-2"></i>Full
                          Name
                        </label>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger mt-1 small"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 ">
                      <div className="form-floating  mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="e.g. Senior Software Engineer"
                        />
                        <label htmlFor="title" className="second-color">
                          <i className="bi bi-briefcase frist-color me-2"></i>
                          Professional Title
                        </label>
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-danger mt-1 small"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-4">
                    <Field
                      as="textarea"
                      className="form-control"
                      id="bio"
                      name="bio"
                      style={{ height: "150px" }}
                      placeholder="Tell us about your professional background"
                    />
                    <label htmlFor="bio">
                      <i className="bi bi-file-text text-success me-2"></i>
                      Professional Bio
                    </label>
                    <div className="d-flex justify-content-between mt-1">
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="text-danger small"
                      />
                      <small className=" second-color">
                        <span
                          className={
                            values.bio?.length > 400 ? "text-warning" : ""
                          }
                        >
                          {values.bio?.length || 0}
                        </span>
                        /500 characters
                      </small>
                    </div>
                  </div>
                </div>

                {/* Skills Tab */}
                <div
                  className={activeTab === "skills" ? "d-block" : "d-none"}
                  style={{ padding: "20px" }}
                >
                  <div className="mb-4">
                    <label htmlFor="skills" className="form-label fw-bold mb-3 second-color">
                      <i className="bi bi-lightbulb-fill frist-color me-2"></i>
                      Areas of Expertise
                    </label>
                    <div className="input-group mb-3 shadow-sm">
                      <span className="input-group-text bg-frist-color text-white">
                        <i className="bi bi-plus-lg"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="skills"
                        placeholder="Type a skill and press Enter to add"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            setFieldValue("skills", [
                              ...values.skills,
                              e.target.value.trim(),
                            ]);
                            e.target.value = "";
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>

                    <div className="skills-container p-4 border rounded-2 bg-light shadow-sm">
                      {values.skills.length === 0 ? (
                        <div className="text-center py-4">
                          <i className="bi bi-lightbulb text-muted fs-1 mb-3"></i>
                          <p className="text-muted mb-0">
                            No skills added yet. Add your areas of expertise
                            above.
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex flex-wrap gap-2">
                          {values.skills.map((item, index) => (
                            <span
                              key={index}
                              className="badge bg- py-2 px-2 fs-8 shadow-sm"
                              style={{ transition: "all 0.2s ease",backgroundColor:"#118577" }}
                            >
                              {item}
                              <button
                                type="button"
                                className="btn-close btn-close-white ms-2"
                                aria-label="Remove"
                                onClick={() =>
                                  setFieldValue(
                                    "skills",
                                    values.skills.filter((_, i) => i !== index)
                                  )
                                }
                              ></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-danger mt-2 small"
                    />
                  </div>
                </div>

                {/* Contact Tab */}
                <div
                  className={activeTab === "contact" ? "d-block" : "d-none"}
                  style={{ padding: "20px" }}
                >
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="your.email@example.com"
                        />
                        <label htmlFor="email">
                          <i className="bi bi-envelope text-success me-2"></i>
                          Email Address
                        </label>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mt-1 small"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <Field
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="e.g. 01234567890"
                        />
                        <label htmlFor="phone">
                          <i className="bi bi-telephone text-success me-2"></i>
                          Phone Number
                        </label>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-danger mt-1 small"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mt-4">
                    <div className="d-flex">
                      <i className="bi bi-info-circle-fill fs-4 me-3 text-primary"></i>
                      <div>
                        <h5 className="alert-heading">Contact Privacy</h5>
                        <p className="mb-0">
                          Your contact information is only visible to
                          administrators and mentees who have booked sessions
                          with you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2 p-2 border-top">
                  {activeTab !== "basic" && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary text-white  px-4 py-2"
                      style={{
                        transition: "all 0.2s ease",
                        backgroundColor:"#118577",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#118577")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#118577")
                      }
                      onClick={() =>
                        setActiveTab(
                          activeTab === "skills" ? "basic" : "skills"
                        )
                      }
                    >
                      <i className="bi bi-arrow-left me-2"></i>Previous
                    </button>
                  )}

                  {activeTab !== "contact" ? (
                    <button
                      type="button"
                      className="btn btn-success  px-4 py-2 ms-auto"
                      style={{
                        transition: "all 0.2s ease",
                        backgroundColor: "#118577",
                        boxShadow: "0 4px 6px rgba(25, 135, 84, 0.2)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "translateY(-2px)")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.transform = "")}
                      onClick={() =>
                        setActiveTab(
                          activeTab === "basic" ? "skills" : "contact"
                        )
                      }
                    >
                      Next<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-   px-5 py-2 ms-auto"
                      style={{
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 6px rgba(25, 135, 84, 0.2)",
                        backgroundColor:"#118577",
                        color:"white"
                      }}
                      onMouseOver={(e) =>
                        !loading &&
                        (e.currentTarget.style.transform = "translateY(-2px)")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.transform = "")}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border bg-frist-color spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>Save
                          Profile
                        </>
                      )}
                    </button>
                  )}
                </div>

                {message && (
                  <div className="alert alert-success mt-3">{message}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
