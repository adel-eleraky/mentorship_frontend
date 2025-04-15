import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, uploadImage } from "../../rtk/features/userSlice";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getLoggedInUser } from "../../rtk/features/authSlice";

const PersonalInfoSection = ({
  userData,
  handleInputChange,
  handleExpertiseChange,
  removeExpertise,
}) => {
  const dispatch = useDispatch();
  const { errors, loading, updateMessage, status, imageLoading, imageMessage, updateLoading } = useSelector(
    (state) => state.user
  );
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(getLoggedInUser())
  }, [imageLoading]);



  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username cannot exceed 30 characters")
      .matches(
        /^[a-zA-Z_ ]+[a-zA-Z]$/,
        "Username can only contain letters, underscores, spaces, and must end with a letter"
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
      .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Title must start with a letter and can only contain letters, numbers, and spaces")
      .required("Professional Title is required")
    ,

    about: Yup.string()
      .min(20, "About must be at least 20 characters long")
      .max(500, "About must be at most 500 characters")
      .matches(/^[A-Za-z]{5}/, "About must start with at least 5 letters"),

      skills: Yup.array()
      .of(
        Yup.string()
          .matches(/^[A-Za-z][A-Za-z0-9+#. ]*$/, "Skills must start with a letter and only contain letters, numbers, spaces, and specific symbols (+, #, .)")
          .required()
      )
      .min(1, "At least one skill is required")
      .required("Skills are required")
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
    dispatch(updateUserProfile(values));
    // .then(() => {
    //   toast.success("Profile updated successfully!");
    // })
    // .catch((error) => {
    //   toast.error("Failed to update profile. Please try again.");
    // });
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
    // console.log(value)

    dispatch(uploadImage(values))
    // const formData = new FormData();
    // formData.append("image", values.image);

    // const res = await axios.put(
    //   `http://localhost:3000/api/v1/users/upload`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     withCredentials: true,
    //   }
    // );
    // setImage(res.data.data.image);
  };

  console.log(imageLoading, imageMessage);
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Personal Information</h2>
        {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
        <img
          src={`http://localhost:3000/img/users/${user.image}`}
          alt="Preview"
          className="img-thumbnail rounded-circle"
          style={{ width: "100px" }}
        />
        {!imageLoading && imageMessage && (
          <div className="alert alert-success mt-3" style={{ width: "fit-content" }}>{imageMessage}</div>
        )}

        <div className="mb-3">
          <Formik
            initialValues={{ image: null }}
            validationSchema={ImageUploadSchema}
            onSubmit={handleImageUpload}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form encType="multipart/form-data">
                {/* File Input */}
                <div className="mb-3">
                  <label className="form-label">Select an Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                      setPreview(URL.createObjectURL(file));
                    }}
                  />
                  {errors.image && touched.image && (
                    <div className="text-danger mt-1">{errors.image}</div>
                  )}
                </div>

                {/* Image Preview */}
                {preview && (
                  <div className="mb-3 d-flex align-items-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-thumbnail rounded-circle"
                      style={{ width: "100px" }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary ms-3"
                      style={{ height: "45px" }}
                    >
                      Upload
                    </button>
                  </div>
                )}

                {/* Submit Button */}
              </Form>
            )}
          </Formik>
        </div>
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
                <label htmlFor="about" className="form-label">
                  About
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="about"
                  name="about"
                  rows="4"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="skills" className="form-label">
                  Areas of Skills
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
                <ErrorMessage
                  name="skills"
                  component="div"
                  className="text-danger"
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
                {errors?.email && (
                  <div className="text-danger"> {errors?.email} </div>
                )}
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
                {errors?.phone && (
                  <div className="text-danger"> {errors?.phone} </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                {loading ? (
                  <>
                    {" "}
                    <CircularProgress size={24} color="inherit" /> Saving..{" "}
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </Form>
          )}
        </Formik>
        {!updateLoading && updateMessage && (
          <div className="alert alert-success mt-3" style={{ width: "fit-content" }}>{updateMessage}</div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
