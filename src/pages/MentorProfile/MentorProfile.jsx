import "./MentorProfile.css";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import ReviewMentor from "../../components/ReviewMentor/ReviewMentor";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserSessions } from "../../rtk/features/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function MentorProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  let { id } = useParams();
  const { sessions: userSessions } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth)
  const [requestTime , setRequestTime] = useState("")
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")

  
  // console.log("request time" , requestTime)

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
      // console.log(response.data.data);

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

      // console.log(response.data.data.skills);
      // console.log(response.data.data);

      setLoading(false);
    } catch (err) {
      // console.log(err);
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

    // console.log("session ", session);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  useEffect(() => {
    fetchSessions();
    fetchMentor();

    dispatch(getUserSessions())

  }, [id, user]);

  
  const groupByDay = () => {
    if (typeof mentor?.availability !== "object" || Array.isArray(mentor.availability)) {
      return [];
    }
  
    return Object.entries(mentor.availability);
  };

  // const handleRequestSession = async () => {
    
  //   const requestData = { mentor: mentor._id , user: user._id, title , description, requested_time: requestTime}
  //   let { data } = await axios.post(`http://localhost:3000/api/v1/oneTo1sessions/request` , requestData )
  // }
  const sessionRequestSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(16, "Description must be at least 16 characters")
  });

  // Initial form values
  const initialValues = {
    title: "",
    description: ""
  };



  const handleRequestSession = async (values, { resetForm }) => {
    const requestData = { 
      mentor: mentor._id, 
      user: user._id, 
      title: values.title, 
      description: values.description, 
      requested_time:{ day: requestTime.day, time: requestTime.time.time }  
    };
    
    try {
      let { data } = await axios.post(`http://localhost:3000/api/v1/oneTo1sessions/request`, requestData);
      
      // Close modal after successful submission
      const modalElement = document.getElementById("exampleModa2");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };


 
  return (
    <>
      <MentorInfo mentor={mentor} />

      {/* ============================ Sessions =========================== */}
      <div className="container py-3 mb-4 mt-5">
        <div className="d-flex justify-content-between">
          <h3 className="mx-3 second-color">Sessions</h3>
        
        </div>

        {/* Session Request Modal */}
        <div className="modal fade" id="exampleModa2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 second-color" id="exampleModalLabel ">Request One Hour Session</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body container">
                <Formik
                  initialValues={initialValues}
                  validationSchema={sessionRequestSchema}
                  onSubmit={handleRequestSession}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form className="row g-3 container">
                      <div className="col-md-6">
                        <label htmlFor="title" className="form-label second-color">Title</label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label second-color">Description</label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          rows="6"
                          className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-sm-6">
                          <label className="form-label second-color">Selected time:</label>
                          <div><i className="bi bi-clock me-1"></i> { requestTime.day ?  requestTime.day + " , " + requestTime?.time?.time : "No time selected" }</div>
                        </div>
                        <div className="col-sm-6">
                          <label className="form-label second-color">Price: </label>
                          <span className="frist-color">${mentor?.hour_price}</span>
                        </div>
                      </div>
                      
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn edit-send" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>


        {/* Sessions List */}
        <div className="p-4 ">
          <div className="container py-4">
            <div className="row g-3">
              {sessions.map((session, index) => {
                const isRegistered = userSessions.some(
                  reg => reg.session?._id === session?._id && reg.user?._id === user?._id
                );

                return (
                  <div className="col-md-4" key={index}>

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
                            {session.has_room ? <span className="badges features-badge">
                              <i className="bi bi-chat-dots" />  Chat Room
                            </span> : <span className="badges features-nbadge">
                              <i className="bi bi-chat-dots" /> Chat Room
                            </span>}
                          </div>
                        </div>
                      </div>
                      <div class="session-footer second-color">
                        <button
                          className="btn booking w-100"
                          disabled={isRegistered}
                          onClick={() => {
                            if(!user) {
                              return navigate("/login")
                            }
                            makePayment(session._id)
                          }}
                        >
                          {isRegistered ? "Already registered" : "Register Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* ============================ Availability =========================== */}
      <div className="container py-3 mb-4 mt-5 ">
  <h3 className="mx-3 fw-medium  second-color mb-4 mt-2">Availability</h3>
  <div className="row">
    {groupByDay().length > 0 ? (
      groupByDay().map(([day, times], index) => (
        <div className="col-md-3" key={index}>
          <div className=" mb-3 p-2">
            <div className=" session-card availability">
            <div class="session-header mb-2">
              <span>{day}</span>
              <span className="frist-color mx-2">
                ${mentor?.hour_price} / hour
              </span>
            </div>
              
              <h5 className="card-title "></h5>
              <div className="">
                <div>
                {Array.isArray(times) && times.length > 0 ? (
                  times.map((time, timeIndex) => (
                    <div 
                    className="d-flex align-items-center p-2 rounded mb-2"
                    style={{ 
                      backgroundColor: 
                        requestTime?.day === day && requestTime?.time?.time === time.time 
                          ? '#e8f5f3' 
                          : 'transparent',
                      border: '1px solid #dee2e6',
                      transition: 'all 0.2s ease'
                      
                    }}
                    key={timeIndex} 
                    // onClick={() => handleTimeSelect(day, time)}

                    // className="form-check mb-3" 
                    onClick={() => setRequestTime({ day, time})}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModa2"
                    
                    >
                      
                      <input
                        type="checkbox"
                        className="form-check-input "
                        id={`${day}-${timeIndex}`}
                        name={`${day}`}
                        value={time}
                        style={{ cursor: 'pointer' }}
                        checked={requestTime?.day === day && requestTime?.time?.time === time.time}

                        // onChange={(e) => setRequestTime(time)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${day}-${timeIndex}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="bi bi-clock me-1"></i> {time.time}
                      </label>

                      
                      
                      
                    </div>
                    
                    
                  ))
                ) : (
                  <div className="text-muted">No time slots</div>
                )}

                </div>
                {/* <button
            className="btn edit-send"
            data-bs-toggle="modal"
            data-bs-target="#exampleModa2"
          >
            Session Request
          </button> */}
                
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-muted mx-3">No availability data found.</p>
    )}
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