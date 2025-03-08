import React from "react";
// import "./MentorProfile.css";
import { useState } from "react";
function MentorProfile() {

  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    if (skill.trim() !== "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
  }
  
  return (
    <>
      <div className="row  ">
        <div className="comtainer  rounded">
          <div className="px-5 pb-4  cover mb-5">
            <div className="media  profile-head comtainer">
              <div className="profile  mr-3">
                <img
                  src="https://cdn.mentorcruise.com/cdn-cgi/image/width=368,format=auto/https://cdn.mentorcruise.com/cache/f88c4f35f7c951fb0710dc0e074c52a0/003d3bdb45c16bb9/220bafd789a1a63dac7ac070f0e6d672.jpg"
                  alt="..."
                  width={230}
                  className="rounded mb-2 img-thumbnail"
                />
                <div className="media-body m-3 ">
                  <h2 className="mt-2 mb-2">Roberta Basili</h2>
                  <i class="fa-regular fa-user"></i>
                  <p className=" mentor-title mb-2">
                    ICF Certified Career Coach | Former Senior Recruiter in Tech
                    @ Atlassian, Booking com, TomTom, Tony's Chocolonely
                    <i className="fas fa-map-marker-alt mr-2" />
                    profile
                  </p>
                  <button
                    href="#"
                    className="btn edit-send"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================== About ============================ */}
      <div className="container py-3 mb-4 bg-light rounded shadow-sm mt-5">
        <h3 className="mx-3">About</h3>
        <div className="p-4 rounded  bg-light">
          <p className="font-italic mb-0">
            Hi there, my name is Roberta! I'm a Certified Professional Coach,
            accredited by the International Coaching Federation (ACC). I bring
            over 15 years of corporate experience. I spent almost a decade
            working in HR and Talent Acquisition in Switzerland and the
            Netherlands. I hired hundreds of people across all functions and
            partnered up globally with Directors and Managers. I worked for
            companies like Booking com, TomTom, Atlassian and Tony’s
            Chocolonely.
          </p>
          <div>
            {/* ======================================================= */}
            <div>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Edit profile
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body container">
                      <form className="row g-3 container">
                        <div className="col-md-6">
                          <label htmlFor="title" className="form-label">
                            Jop Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputlinkedin" className="form-label">
                            linkedin
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputlinkedin"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputAddress" className="form-label">
                            Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder=" Enter your address"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="formFile" className="form-label">
                            profile photo
                          </label>
                          <input
                            className="form-control"
                            accept="image/*"
                            type="file"
                            id="formFile"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="bio" class="form-label">
                            Biography
                          </label>
                          <textarea
                            class="form-control"
                            id="bio"
                            rows="6"
                          ></textarea>
                        </div>
                      
                        <div className="row g-3">
                      <div className="col-sm-6">
                      <label htmlFor="skills" className="form-label">
                            Skills
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            id="skills"
                            placeholder="add your skills"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                          />
            
                      </div>
                      <div className="col-sm-6 d-flex align-items-end ">
                      <button onClick={addSkill} className="btn btn-md edit-send ">Add Skill</button>
                      </div>
                    </div>
                        <div className="col-sm-12">
                                {skills.map((s, index) => (
                                  <span key={index} className="skill">{s}</span>
                                ))}
                          </div>
                 
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn edit-send">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ============================ Sessions =========================== */}

      <div className="container py-3 mb-4 bg-light rounded shadow-sm mt-5">
        <div className="d-flex justify-content-between">
          <h3 className="mx-3">Sessions</h3>
          <button
            href="#"
            className="btn edit-send"
            data-bs-toggle="modal"
            data-bs-target="#exampleModa2"
          >
            Add Session
          </button>
        </div>

        <div>
          <div
            className="modal fade"
            id="exampleModa2"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl ">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Session
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body container">
                  <form className="row g-3 container">
                    <div className="col-md-6">
                      <label htmlFor="title2" className="form-label">
                        Title
                      </label>
                      <input type="text" className="form-control" id="title2" />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="inputPrice" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputPrice"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="discription" class="form-label">
                        Discription
                      </label>
                      <textarea
                        class="form-control"
                        id="discription"
                        rows="6"
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Duration
                      </label>
                      <select className="form-select ">
                        <option value="1" className="options">
                          30 minutes , 0.5 hour
                        </option>
                        <option value="2">60 minutes , 1 hour</option>
                        <option value="3"> 90 minutes , 1.5 hour</option>
                        <option value="3"> 120 minutes , 2 hour</option>
                      </select>
                    </div>

                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label htmlFor="inputDate" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          aria-label="Date"
                          id="inputDate"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="inputTime" className="form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          aria-label="Time"
                          id="inputTime"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Has Chat Room
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn edit-send">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded  bg-light">

          {/* ======================================================= */}
            <div className="container py-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center py-2">
                      <h4 className="card-title">Web Development</h4>
                      <span className="badge  price-badge">$99.99</span>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <div className="info-label">Description</div>
                        <div className="description-box">
                          A comprehensive workshop covering HTML, CSS, and Bootstrap fundamentals.
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="info-label">Duration</div>
                        <div className="icon-text mt-1">
                          <i className="bi bi-clock" /> 90 minutes, 1.5 hour
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="info-label">Date</div>
                            <div className="icon-text">
                              <i className="bi bi-calendar3" /> March 15, 2025
                            </div>
                          </div>
                          <div>
                            <div className="info-label">Time</div>
                            <div className="icon-text">
                              <i className="bi bi-alarm" /> 10:00 AM
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="badge features-badge">
                          <i className="bi bi-chat-dots" /> Chat Room
                        </span>
                      </div>
                      <div className="mt-2">
                        <button className="btn booking  w-100">Register Now</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center py-2">
                      <h5 className="card-title">UX Design Basics</h5>
                      <span className="badge  price-badge">$75.00</span>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <div className="info-label">Description</div>
                        <div className="description-box">
                          Learn the fundamentals of user experience design and create intuitive interfaces.
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="info-label">Duration</div>
                        <div className="icon-text mt-1">
                          <i className="bi bi-clock" /> 60 minutes, 1 hour
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="info-label">Date</div>
                            <div className="icon-text">
                              <i className="bi bi-calendar3" /> March 20, 2025
                            </div>
                          </div>
                          <div>
                            <div className="info-label">Time</div>
                            <div className="icon-text">
                              <i className="bi bi-alarm" /> 2:00 PM
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="badge features-badge">
                          <i className="bi bi-chat-dots" /> Chat Room
                        </span>
                      </div>
                      <div className="mt-2">
                        <button className="btn booking w-100">Register Now</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center py-2">
                      <h5 className="card-title">JavaScript Basics</h5>
                      <span className="badge price-badge">$120.00</span>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <div className="info-label">Description</div>
                        <div className="description-box">
                          Introduction to JavaScript programming for web developers. Learn core concepts.
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="info-label">Duration</div>
                        <div className="icon-text mt-1">
                          <i className="bi bi-clock" /> 120 minutes, 2 hours
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="info-label">Date</div>
                            <div className="icon-text">
                              <i className="bi bi-calendar3" /> March 25, 2025
                            </div>
                          </div>
                          <div>
                            <div className="info-label">Time</div>
                            <div className="icon-text">
                              <i className="bi bi-alarm" /> 11:00 AM
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="badge features-badge">
                          <i className="bi bi-chat-dots" /> Chat Room
                        </span>
                      </div>
                      <div className="mt-2">
                        <button className="btn booking w-100">Register Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


        </div>
      </div>

      {/* ============================ Skills =========================== */}
        <div className="container py-3 mb-4 bg-light rounded shadow-sm mt-5">
          
        <h3 className="mx-3">Skills: </h3>
        <div className="p-4 rounded  bg-light">
          {skills.map((s, index) => (
           <span key={index} className="list-skills">{s}</span>
          ))}
          <div/>
         </div>

        </div>
    </>
  );
}

export default MentorProfile;
