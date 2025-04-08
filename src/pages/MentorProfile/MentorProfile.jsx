import "./MentorProfile.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import ReviewMentor from "../../components/ReviewMentor/ReviewMentor";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserSessions } from "../../rtk/features/userSlice";

function MentorProfile() {
  const dispatch = useDispatch()
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  let { id } = useParams();
  const { sessions: userSessions } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth)

  console.log("registered sessions ", userSessions)
  console.log("mentor sessions ", sessions)
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toTimeString().split(" ")[0];
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/sessions/mentor/${id}`
      );
      setSessions(response.data.data);
      console.log(response.data.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchMentor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/mentors/${id}`
      );
      setMentor(response.data.data);
      setSkills(response.data.data.skills || []);

      console.log(response.data.data.skills);
      console.log(response.data.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const makePayment = async (sessionId) => {
    const stripe = await loadStripe(
      "pk_test_51MQiTdHdpPhRIKKWKS8bzAP7QcJHnbcqNmCzH9SK64ifDGAZFzIGTZIxEOmIoXIOs5MiUrhlFZqtpA6YGK2PqNrL00HGYrQEpd"
    );

    const res = await axios.get(
      `http://localhost:3000/api/v1/bookings/checkout-session/${sessionId}`,
      { withCredentials: true }
    );
    const { data: session } = await res.data;

    console.log("session ", session);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  useEffect(() => {
    fetchSessions();
    fetchMentor();

    dispatch(getUserSessions())

  }, [id, user]);

  return (
    <>
      <MentorInfo mentor={mentor} />
  
      {/* ============================ Sessions =========================== */}
      <div className="container py-3 mb-4 mt-5">
        <div className="d-flex justify-content-between">
          <h3 className="mx-3">Sessions</h3>
          <button
            className="btn edit-send"
            data-bs-toggle="modal"
            data-bs-target="#exampleModa2"
          >
            Session Request
          </button>
        </div>
  
        {/* Session Request Modal */}
        <div className="modal fade" id="exampleModa2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Request a Session</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body container">
                <form className="row g-3 container">
                  <div className="col-md-6">
                    <label htmlFor="title2" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title2" />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="discription" className="form-label">Description</label>
                    <textarea className="form-control" id="discription" rows="6"></textarea>
                  </div>
  
                  <div className="col-md-6">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <select className="form-select" id="duration">
                      <option value="1">30 minutes</option>
                      <option value="2">1 hour</option>
                      <option value="3">1.5 hour</option>
                      <option value="4">2 hours</option>
                      <option value="5">2.5 hours</option>
                      <option value="6">3 hours</option>
                    </select>
                  </div>
  
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="inputDate" className="form-label">Date</label>
                      <input type="date" className="form-control" id="inputDate" />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="inputTime" className="form-label">Time</label>
                      <input type="time" className="form-control" id="inputTime" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn edit-send">Submit</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Sessions List */}
        <div className="p-4 rounded bg-light">
          <div className="container py-4">
            <div className="row g-3">
              {sessions.map((session, index) => {
                const isRegistered = userSessions.some(
                  reg => reg.session._id === session._id && reg.user._id === user._id
                );
  
                return (
                  <div className="col-md-4" key={index}>
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center py-2">
                        <h4 className="card-title">{session.title}</h4>
                        <span className="badges price-badge">${session.price}</span>
                      </div>
                      <div className="card-body">
                        <div className="mb-2">
                          <div className="info-label">Description</div>
                          <div className="description-box">{session.description}</div>
  
                          <div className="session-categories d-flex justify-content-between align-items-center">
                            <div className="mb-2">
                              <div className="info-label">Duration:</div>
                              <div className="icon-text mt-1">
                                <i className="bi bi-clock" /> {session.duration} minutes
                              </div>
                            </div>
  
                            <div className="mb-2 mx-4">
                              <div className="info-label">Date</div>
                              <div className="icon-text">
                                <i className="bi bi-calendar3" /> {formatDate(session.schedule_time)}
                              </div>
                            </div>
                          </div>
  
                          <div className="session-categories d-flex justify-content-between align-items-center">
                            <div className="mb-2">
                              <div className="info-label">Time:</div>
                              <div className="icon-text mt-1">
                                <i className="bi bi-alarm" />
                                {formatTime(session.duration)}
                              </div>
                            </div>
  
                            <div className="mb-2 mt-1 mx-4">
                              {session.features && session.features.map((feature, index) => (
                                <span key={index} className="badges features-badge me-1">
                                  <i className={`bi bi-${feature.icon}`} /> {feature.name}
                                </span>
                              ))}
                              {session.has_room ? (
                                <span className="badges features-badge">
                                  <i className="bi bi-chat-dots" /> Chat Room
                                </span>
                              ) : (
                                <span className="badges features-nbadge">
                                  <i className="bi bi-chat-dots" /> Chat Room
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
  
                        <div className="session-footer second-color">
                          <button
                            className="btn booking w-100"
                            disabled={isRegistered}
                            onClick={() => makePayment(session._id)}
                          >
                            {isRegistered ? "Already registered" : "Register Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  
      {/* ============================ Skills =========================== */}
      <div className="container py-3 mb-4 mt-5">
        <h3 className="mx-3 fw-medium second-color">Skills :</h3>
        <div className="p-4 rounded">
          {skills.map((s, index) => (
            <span key={index} className="list-skills">
              {s}
            </span>
          ))}
        </div>
      </div>
  
      {/* ============================ ReviewMentor =========================== */}
      <div>
        <ReviewMentor mentor={mentor?._id} />
      </div>
    </>
  )
}


export default MentorProfile