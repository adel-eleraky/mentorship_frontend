import React from "react";

const PersonalInfoSection = ({
  mentorData,
  handleInputChange,
  handleExpertiseChange,
  removeExpertise,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Personal Information</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={mentorData.name}
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
              value={mentorData.title}
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
              value={mentorData.bio}
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
              {mentorData.expertise.map((item, index) => (
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
              value={mentorData.contactEmail}
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
              value={mentorData.phone}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
