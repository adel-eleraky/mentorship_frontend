import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateMentorProfile } from "../../rtk/features/mentorSlice";

const PersonalInfoSection = ({
  mentorData,

  loading,
  message,
}) => {
  const dispatch = useDispatch();

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
    dispatch(updateMentorProfile(values));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Personal Information</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Professional Title
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows="4"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="skills" className="form-label">
                  Areas of skills
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="skills"
                  placeholder="Type and press Enter to add"
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
                <div className="mt-2">
                  {values.skills.map((item, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-2">
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
                        style={{ fontSize: "0.5rem" }}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <Field
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
              {message && (
                <div className="alert alert-success mt-3">{message}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
