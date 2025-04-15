import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, uploadImage } from "../../rtk/features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoggedInUser } from "../../rtk/features/authSlice";

const PersonalInfoSection = ({ userData }) => {
  const dispatch = useDispatch();
  const { loading, updateMessage, imageLoading, imageMessage, updateLoading } =
    useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("basic");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [imageLoading, dispatch, loading]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters long")
      .max(30, "Full Name cannot exceed 30 characters")
      .matches(
        /^[a-zA-Z_ ]+[a-zA-Z]$/,
        "Full Name can only contain letters, underscores, spaces, and must end with a letter"
      )
      .required("Full Name is required"),

    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(?![0-9]+$)[a-zA-Z0-9_.]+@[a-zA-Z]+\.(com|org|net|io|edu)$/i,
        "Email must have letters, numbers, or dots before @, only letters after @, and end with .com, .org, .net, .io, or .edu"
      ),

    phone: Yup.string()
      .matches(
        /^(010|011|012|015)[0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"
      )
      .length(11, "Phone number must be 11 characters long")
      .required("Phone number is required"),

    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(30, "Title cannot exceed 30 characters")
      .matches(
        /^[A-Za-z][A-Za-z0-9 ]*$/,
        "Title must start with a letter and can only contain letters, numbers, and spaces"
      )
      .required("Professional Title is required"),

    about: Yup.string()
      .min(20, "About must be at least 20 characters long")
      .max(500, "About must be at most 500 characters")
      .matches(/^[A-Za-z]{5}/, "About must start with at least 5 letters"),

    skills: Yup.array()
      .of(
        Yup.string()
          .matches(
            /^[A-Za-z][A-Za-z0-9+#. ]*$/,
            "Skills must start with a letter and only contain letters, numbers, spaces, and specific symbols (+, #, .)"
          )
          .required()
      )
      .min(1, "At least one skill is required")
      .required("Skills are required"),
  });

  const initialValues = {
    name: userData.name || "",
    title: userData.title || "",
    about: userData.about || "",
    skills: userData.skills || [],
    email: userData.email || "",
    phone: userData.phone || "",
  };

  const submitHandler = (values) => {
    dispatch(updateUserProfile(values))
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update profile. Please try again.");
      });
  };

  const ImageUploadSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("An image is required")
      .test(
        "fileFormat",
        "Unsupported format",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      )
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
  });

  const handleImageUpload = async (values) => {
    dispatch(uploadImage(values));
  };

  return (
    <div className="personal-info-container">
      <div
        className="profile-header mb-4 p-3 bg-gradient rounded-1"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderBottom: "3px solid white",
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-7">
            <h2
              className="display-6 fw-bold second-color mb-3"
              style={{ color: "#118577" }}
            >
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
                src={`http://localhost:3000/img/users/${user?.image}`}
                alt="Profile"
                className="rounded-circle profile-image shadow-lg"
                style={{
                  maxWidth: "120px",
                  maxHeight: "120px",
                  objectFit: "cover",
                  border: "5px solid white",
                  marginBottom: "4px",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />

              <Formik
                initialValues={{ image: null }}
                validationSchema={ImageUploadSchema}
                onSubmit={handleImageUpload}
              >
                {({ setFieldValue, values, errors, touched }) => (
                  <Form encType="multipart/form-data">
                    <div
                      className="position-absolute d-flex align-items-center justify-content-center"
                      style={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(17, 133, 119, 0.8)",
                        height: "40px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() =>
                        document.getElementById("profile-image-upload").click()
                      }
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(17, 133, 119, 0.9)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(17, 133, 119, 0.8)")
                      }
                    >
                      <i className="bi bi-camera-fill text-white me-2"></i>
                      <span className="text-white small">Change Photo</span>
                      <input
                        type="file"
                        id="profile-image-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("image", file);
                            // Show preview
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              document.querySelector(".profile-image").src =
                                e.target.result;
                            };
                            reader.readAsDataURL(file);

                            // Auto-submit instead of showing the button
                            setTimeout(() => {
                              document
                                .getElementById("upload-image-btn")
                                .click();
                            }, 500);
                          }
                        }}
                      />
                    </div>

                    {/* Hidden submit button */}
                    <button
                      id="upload-image-btn"
                      type="submit"
                      style={{ display: "none" }}
                    >
                      Upload
                    </button>

                    {/* Loading indicator */}
                    {imageLoading && (
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                      >
                        <div
                          className="spinner-border"
                          style={{ color: "#118577" }}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}

                    {errors.image && touched.image && (
                      <div
                        className="position-absolute text-center"
                        style={{ top: "-30px", left: 0, right: 0 }}
                      >
                        <div className="badge bg-danger">{errors.image}</div>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white p-0 border-bottom-0">
          <ul className="nav nav-pills nav-fill p-2">
            <li className="nav-item mx-1">
              <button
                className={`nav-link px-1 py-2 ${
                  activeTab === "basic"
                    ? "active text-white"
                    : "text-black border border-secondary"
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
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "basic") {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.color = "black";
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
                    ? "active text-white"
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
                    ? "active text-white"
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
                          <i
                            className="bi bi-person me-2"
                            style={{ color: "#118577" }}
                          ></i>
                          Full Name
                        </label>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger mt-1 small"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="e.g. Senior Software Engineer"
                        />
                        <label htmlFor="title">
                          <i
                            className="bi bi-briefcase me-2"
                            style={{ color: "#118577" }}
                          ></i>
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
                      id="about"
                      name="about"
                      style={{ height: "150px" }}
                      placeholder="Tell us about yourself"
                    />
                    <label htmlFor="about">
                      <i
                        className="bi bi-file-text me-2"
                        style={{ color: "#118577" }}
                      ></i>
                      About Me
                    </label>
                    <div className="d-flex justify-content-between mt-1">
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-danger small"
                      />
                      <small className="text-muted">
                        <span
                          className={
                            values.about?.length > 400 ? "text-warning" : ""
                          }
                        >
                          {values.about?.length || 0}
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
                    <label className="form-label d-flex align-items-center mb-3">
                      <i
                        className="bi bi-tags-fill me-2"
                        style={{ color: "#118577" }}
                      ></i>
                      <span className="fw-bold">Skills & Expertise</span>
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="bi bi-plus-circle"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a skill (e.g., JavaScript, React, UI Design)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            e.preventDefault();
                            if (
                              !values.skills.includes(e.target.value.trim())
                            ) {
                              setFieldValue("skills", [
                                ...values.skills,
                                e.target.value.trim(),
                              ]);
                            }
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-danger mb-3 small"
                    />

                    <div className="skills-container">
                      {values.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge me-2 mb-2 p-2"
                          style={{
                            fontSize: "0.9rem",
                            backgroundColor: "#118577",
                          }}
                        >
                          {skill}
                          <i
                            className="bi bi-x-circle-fill ms-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setFieldValue(
                                "skills",
                                values.skills.filter((_, i) => i !== index)
                              )
                            }
                          ></i>
                        </span>
                      ))}
                      {values.skills.length === 0 && (
                        <p className="text-muted fst-italic">
                          No skills added yet. Add skills to showcase your
                          expertise.
                        </p>
                      )}
                    </div>
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
                          placeholder="Enter your email"
                        />
                        <label htmlFor="email">
                          <i
                            className="bi bi-envelope-fill me-2"
                            style={{ color: "#118577" }}
                          ></i>
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
                          placeholder="Enter your phone number"
                        />
                        <label htmlFor="phone">
                          <i
                            className="bi bi-telephone-fill me-2"
                            style={{ color: "#118577" }}
                          ></i>
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
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn px-4 py-2 text-white"
                    style={{ backgroundColor: "#118577" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
