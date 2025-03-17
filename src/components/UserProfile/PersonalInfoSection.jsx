import React from "react";
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik";

const PersonalInfoSection = ({
  userData,
  handleInputChange,
  handleExpertiseChange,
  removeExpertise,
}) => {



  console.log(userData)
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    title: Yup.string().required("Professional Title is required"),
    bio: Yup.string().required("Bio is required"),
    contactEmail: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().matches(/^\d{10,15}$/, "Invalid phone number").required("Phone number is required"),
  });


  const initialValues = {
    name: userData.name || "",
    title: userData.title || "",
    about: userData.about || "",
    skills: userData.skills || [],
    email: userData.email || "",
    phone: userData.phone || "",
  }

  const submitHandler = (values) => {
    console.log(values)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Personal Information</h2>
        {/* <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Professional Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={userData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              rows="4"
              value={userData.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="expertise" className="form-label">
              Areas of Expertise
            </label>
            <input
              type="text"
              className="form-control"
              id="expertise"
              placeholder="Type and press Enter to add"
              onKeyDown={handleExpertiseChange}
            />
            <div className="mt-2">
              {userData.expertise.map((item, index) => (
                <span key={index} className="badge bg-primary me-2 mb-2">
                  {item}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    aria-label="Remove"
                    onClick={() => removeExpertise(index)}
                    style={{ fontSize: "0.5rem" }}
                  ></button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="contactEmail" className="form-label">
              Contact Email
            </label>
            <input
              type="email"
              className="form-control"
              id="contactEmail"
              name="contactEmail"
              value={userData.contactEmail}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" className="btn btn-primary">
            Save Changes
          </button>
        </form> */}

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
                <Field type="text" className="form-control" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Professional Title
                </label>
                <Field type="text" className="form-control" id="title" name="title" />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="about" className="form-label">
                  About
                </label>
                <Field as="textarea" className="form-control" id="about" name="about" rows="4" />
                <ErrorMessage name="about" component="div" className="text-danger" />
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
                      setFieldValue("skills", [...values.skills, e.target.value.trim()]);
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
                        onClick={() => setFieldValue("skills", values.skills.filter((_, i) => i !== index))}
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
                <Field type="email" className="form-control" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <Field type="tel" className="form-control" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
