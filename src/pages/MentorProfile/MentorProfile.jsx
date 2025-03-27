import "./MentorProfile.css";
import React, { useEffect, useState } from "react";
import { NavLink,useParams} from "react-router-dom";
import axios from "axios";

function MentorProfile() {

  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions,setSessions]=useState([])
  const [reviews,setReviews]=useState([])
  let { id } = useParams();
// const id ="67d5eb638678c21491e11a92";



  const fetchSessions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/sessions/mentor/${id}`);
      setSessions(response.data.data);
      console.log(response.data.data);

      
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/reviews/mentor/${id}`);
      setReviews(response.data.data);
      console.log(response.data.data);
      
      
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const  fetchMentor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/mentors/${id}`);
      setMentor(response.data.data);
      setSkills(response.data.data.skills || []);

      console.log(response.data.data.skills);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  useEffect(() => {
 

    fetchSessions();
    fetchMentor();
    fetchReviews();

  }, []);
  
  
  return (
    <>
{      (loading) ? <p>Loading...</p>:
 <div className="row m-0 ">
 <div className="comtainer  rounded">
   <div className="px-5 pb-4  cover mb-5">
     <div className="media  profile-head comtainer">
       <div className="profile  mr-3">
         <img
           src={`http://localhost:3000/img/users/${mentor?.image}`}
          alt="..."
           width={230}
           className="rounded mb-2 img-thumbnail"
         />
         <div className="media-body m-3 ">
          <div>
          <h2 className="mt-2 mb-2 fw-bold second-color">{mentor?.name}</h2>
           <p className=" mentor-title fw-medium  mb-2">{mentor?.title}</p>
           <p> Experience: {mentor?.experience}</p>
           <button
             href="#"
             className="btn edit-send"
             data-bs-toggle="modal"
             data-bs-target="#exampleModal"
           >
             Follow
           </button>

          </div>

           <div>
              {/* <NavLink className="navbar-brand fs-4 bold mb-2" to={"/mentor"}>
              <i class="fa-solid fa-gear st-r "></i>
              </NavLink> */}

           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>

}     

      {/* =========================== About ============================ */}
      <div className="container py-3 mb-4 bg-light rounded shadow-sm mt-4">
        <h3 className="mx-3">About</h3>
          {(loading) ? <p>Loading...</p>:
        <div className="p-4 rounded  bg-light">
          <p className="font-italic mb-0">{mentor?.bio}</p>
        </div>}
      </div>
      {/* ============================ Sessions =========================== */}

      <div className="container py-3 mb-4 bg-light rounded shadow-sm mt-5">
        <div className="d-flex justify-content-between">
          <h3 className="mx-3">Sessions</h3>
          {/* <button
            href="#"
            className="btn edit-send"
            data-bs-toggle="modal"
            data-bs-target="#exampleModa2"
          >
            Add Session
          </button> */}
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
                {/* <div className="col-md-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center py-2">
                      <h4 className="card-title">Web Development</h4>
                      <span className="badges  price-badge">$99.99</span>
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
                        <span className="badges features-badge">
                          <i className="bi bi-chat-dots" /> Chat Room
                        </span>
                      </div>
                      <div className="mt-2">
                        <button className="btn booking  w-100">Register Now</button>
                      </div>
                    </div>
                  </div>
                </div> */}
                {sessions.length === 0 ? (
      <p>No sessions yet</p>
    ) : (
      sessions.map((session) => (
        <div className="col-md-4" key={session.id}>
          <div className="card">
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
                <button className="btn booking w-100">Register Now</button>
              </div>
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
        <div className="container py-3 mb-4 bg-light rounded shadow-sm mt-5">
          
        <h3 className="mx-3 fw-medium ">Skills: </h3>
        <div className="p-4 rounded  bg-light">
          {skills.map((s, index) => (
           <span key={index} className="list-skills">{s}</span>
          ))}
          <div/>
         </div>

        </div>


        <div className="container py-3 mb-4 mt-5">
  <h3 className="mx-3 fw-medium ">Reviews :</h3>

  {/* ============================================ */}
  <div className="p-4 rounded">
    {reviews.length === 0 ? (
      <p>No Reviews yet</p>
    ) : (
      reviews.map((review) => (
        <div key={review.id} className="card mb-4 border-0 border-bottom">
          <div className="card-body pb-4">
            <div className="row mb-3">
              <div className="col-auto">
                <div className="bg-secondary rounded-circle" style={{ width: 50, height: 50 }}></div>
              </div>
              <div className="col">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-0">{review.user.name}</h5>
                    <div className="text-primary mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill st-r me-1"></i>
                      ))}
                    </div>
                    <div className="text-muted">
                      {review.rating} out of 5 stars - {review.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="card-text">{review.content}</p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </>
  );
}

export default MentorProfile;
