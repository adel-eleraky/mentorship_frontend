import "./MentorProfile.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import ReviewMentor from "../../components/ReviewMentor/ReviewMentor";
import MentorInfo from "../../components/MentorInfo/MentorInfo";

function MentorProfile() {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  let { id } = useParams();

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
  }, []);

  return (
    <>
      <MentorInfo mentor={mentor} />

      {/* ============================ Sessions =========================== */}

      <div className="container py-3 mb-4  mt-5">
        <div className="d-flex justify-content-between">
          <h3 className="mx-3 second-color">Sessions :</h3>
        </div>

        <div className="p-4   ">
          <div className="container py-4">
            <div className="row g-3">
              {sessions.length === 0 ? (
                <p>No sessions yet</p>
              ) : (
                sessions.map((session) => (
                  <div className="col-md-4" key={session.id}>
                    {/* <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center py-2">
              <h4 className="card-title">{session.title}</h4>
              <span className="badges price-badge">${session.price}</span>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <div className="info-label">Description</div>
                <div className="description-box">
                  {session.description}
                </div>
              </div>
              <div className="mb-2">
                <div className="info-label">Duration</div>
                <div className="icon-text mt-1">
                  <i className="bi bi-clock" /> {session.duration} minutes
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="info-label">Date</div>
                    <div className="icon-text">
                      <i className="bi bi-calendar3" /> {session.schedule_time}
                    </div>
                  </div>

                  <div>
                    <div className="info-label">Time</div>
                    <div className="icon-text">
                      <i className="bi bi-alarm" /> {session.time} 
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="mb-2">
                {session.features && session.features.map((feature, index) => (
                  <span key={index} className="badges features-badge me-1">
                    <i className={`bi bi-${feature.icon}`} /> {feature.name}
                  </span>
                ))}
                {session.has_room ?<span className="badges features-badge">
                  <i className="bi bi-chat-dots" /> Chat Room
                </span>:   <span className="badges features-nbadge">
                  <i className="bi bi-chat-dots" /> Chat Room
                </span>}
             
              </div>
              <div className="mt-2">
                <button className="btn booking w-100" onClick={() => makePayment(session._id)}>Register Now</button>
              </div>
            </div>
          </div> */}

                    <div class="session-card">
                      <div class="session-main-content">
                        <div class="session-header">
                          <span>{session.title}</span>
                          <span className="frist-color mx-2">
                            ${session.price}
                          </span>
                        </div>
                        <p class="session-heading"> {session?.description}</p>

                        <div class="session-categories d-flex jastify-content-between align-items-center">
                          <div className="mb-2">
                            <div className="info-label">Duration:</div>
                            <div className="icon-text mt-1">
                              <i className="bi bi-clock" /> {session?.duration}{" "}
                              minutes
                            </div>
                          </div>

                          <div className="mb-2 mx-4">
                            <div className="info-label">Date</div>
                            <div className="icon-text">
                              <i className="bi bi-calendar3" />{" "}
                              {formatDate(session?.schedule_time)}
                            </div>
                          </div>
                        </div>


                        <div class="session-categories d-flex jastify-content-between align-items-center">
                          <div className="mb-2">
                            <div className="info-label">Time:</div>
                            <div className="icon-text mt-1">
                            <i className="bi bi-alarm" /> 
                               {formatTime(session?.duration)}
                            </div>
                          </div>

                          <div className="mb-2 mt-1 mx-4">
                          {session.features && session.features.map((feature, index) => (
                  <span key={index} className="badges features-badge me-1">
                    <i className={`bi bi-${feature.icon}`} /> {feature.name}
                  </span>
                ))}
                {session.has_room ?<span className="badges features-badge">
                  <i className="bi bi-chat-dots" />  Chat Room
                </span>:   <span className="badges features-nbadge">
                  <i className="bi bi-chat-dots" /> Chat Room
                </span>}
                          </div>
                        </div>



                      </div>
                      <div class="session-footer second-color">
                      <button className="btn booking w-100" onClick={() => makePayment(session._id)}>Register Now</button>

                   
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================ Skills =========================== */}
      <div className="container py-3 mb-4   mt-5">
        <h3 className="mx-3 fw-medium second-color ">Skills : </h3>
        <div className="p-4 rounded  ">
          {skills.map((s, index) => (
            <span key={index} className="list-skills">
              {s}
            </span>
          ))}
          <div />
        </div>
      </div>
      {/* ============================ ReviewMentor =========================== */}
      <div>
        <ReviewMentor mentor={mentor?._id} />
      </div>
    </>
  );
}

export default MentorProfile;
