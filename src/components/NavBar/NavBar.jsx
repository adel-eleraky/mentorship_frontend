import axios from "axios";
import "./NavBar.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../rtk/features/authSlice";
import { markNotificationRead } from "../../rtk/features/notificationSlice";

function NavBar() {
  // const { token, logout } = useAuthentication();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.notification)

  console.log("notifications", notifications)

  const unreadNotifications = notifications?.reduce((count, notify) => {
    return notify.isRead === false ? count + 1 : count;
  }, 0);

    // const handleKeyPress = (e) => {
  //   console.log("search" , e.key)
  //   // if (e.key === 'Enter') {
  //   //   navigate('/mentors');
  //   // }
  // };

  const fetchSearch = async (value) => {
    const res = await axios.post(`http://localhost:3000/api/v1/mentors/search`, { name: value })
    return res.data
  }
  const handleSearch = async (e) => {
    setSearch(e.target.value)
    const mentors = await fetchSearch(e.target.value)
    setSearchResult(mentors.data)
    setSearch("")
  }

  async function handleLogout() {
    // await axios.get("http://localhost:3000/api/v1/auth/logout", { withCredentials: true })
    dispatch(logout())
    // return navigate("/login")
    // <Navigate to={"/login" }/>
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container mt-2 border-bottom border-light-subtle">
          <NavLink className="navbar-brand fs-4 bold mb-2" to={"/"}>
            {/* <span className="fw-bold">Mentor</span>Ship */}
            <span className="fw-bold second-color">Mentor</span>
            <span className="fw-medium frist-color">Ship</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { (
              <form className="d-flex mb-2 mb-lg-0 ms-auto" role="search">
                <div style={{ position: "relative", width: "350px" }}>
                  <input
                    className="form-control w-100 border border-light-subtle"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ paddingLeft: "40px" }}
                    // onKeyPress={handleKeyPress}
                    onChange={handleSearch}
                  />
                  <i
                    className="fas fa-search"
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#cbcbcb",
                      pointerEvents: "none",
                    }}
                  ></i>
                  {searchResult.length != 0 && (
                    <div className="position-absolute search_result">
                      {searchResult.map(mentor => {
                        return (
                          <Link to={`mentorprofile/${mentor._id}`} onClick={() => setSearchResult([])}>
                            <div className="mb-3 d-flex ">
                              <img src={`http://localhost:3000/img/users/${mentor.image}`} style={{ width: "40px", height: "40px" }} className="img-fluid me-3" alt="" />
                              <h5 className="name"> {mentor.name} <br /> <p className="title"> {mentor.title} </p> </h5>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </form>
            )}

            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto align-items-center">
              

              <li className="nav-item mx-4">
                {/* <NavLink className="btn btn-success" to={'/mentors'}>Browse all mentors</NavLink> */}
                <NavLink className="btn btn-success "
                  style={{ background: "#118577" }}
                  to={'/mentors'}>Browse all mentors</NavLink>
              </li>
              {user ?
                (
                  <>
                    <li className="nav-item dropdown me-2">
                      <a
                        className="nav-link dropdown-toggle position-relative notification-badge"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-bell fa-lg fs-4 text-dark"></i>
                        {/* Optional badge */}
                        <span className="position-absolute  top-0 start-25 translate-middle badge rounded-pill bg-danger">
                          {unreadNotifications}
                          <span className="visually-hidden">unread notifications</span>
                        </span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" style={{ width: "300px" }}>
                        <li className="dropdown-item text-muted">You have {unreadNotifications} notifications</li>
                        <li><hr className="dropdown-divider" /></li>
                        {notifications.length != 0 && (
                          [...notifications]?.reverse().map(notify => {
                            return (
                              <>
                                <li className="dropdown-item" style={{ whiteSpace: "normal" }}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={notify.isRead}
                                    onChange={() => {
                                        dispatch(markNotificationRead(notify?._id))
                                      console.log(`Marking notification ${notify?._id} as read`);
                                    }}
                                  />
                                  {notify?.type === "comment" && (
                                    <i className="fas fa-comment-alt" style={{ color: "#4CAF50", marginRight: "8px" }}></i> 
                                  )}
                                  {notify?.type === "like" && (
                                    <i className="fas fa-thumbs-up" style={{ color: "#2196F3", marginRight: "8px" }}></i> 
                                  )}
                                  {notify?.type === "booking" && (
                                    <i className="fas fa-calendar-check" style={{ color: "#FF9800", marginRight: "8px" }}></i> 
                                  )}
                                  {notify?.type === "message" && (
                                    <i className="fas fa-envelope" style={{ color: "#FF5722", marginRight: "8px" }}></i>
                                  )}

                                  {notify?.message}
                                </li>
                                <hr />
                              </>
                            )
                          })
                        )}
                        {/* <li className="dropdown-item">💬 You have a new message</li> */}
                        {/* <li className="dropdown-item">✅ Task completed successfully</li> */}
                        {/* <li>
                          <NavLink className="dropdown-item text-primary text-center" to="/notifications">
                            View all
                          </NavLink>
                        </li> */}
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <img
                        className="nav-link rounded-circle dropdown-toggle img-fluid p-0"
                        style={{ width: "40px" }}
                        src={`http://localhost:3000/img/users/${user.image}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu  end-50 start-50 ">
                        <li>
                          <NavLink className="dropdown-item" to="/user">
                            Dashbord
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to={`/community`}>
                            Community
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to={`/community/user/${user?._id}`}>
                            Community Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="/chat">
                            Chat
                          </NavLink>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => handleLogout()}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                    <button className="btn fw-bold second-color">
                      {user?.name}
                    </button>
                  </>
                  // <>
                  //   <li className="nav-item">
                  //     <NavLink className="nav-link" to={'/chat'}>Chats</NavLink>
                  //   </li>
                  //   <li className="nav-item">
                  //     <NavLink className="nav-link" to={`${user.role == "user" ? "/user" : "/mentor"}`}>Profile</NavLink>
                  //   </li>
                  // </>
                ) :
                (
                  <li className="nav-item ms-4">
                    <NavLink className="nav-link" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                )
              }
              {/* <li className="nav-item ms-4">
                <NavLink className="nav-link" to={'/'}>Log Out</NavLink>
              </li> */}
              {/* <li className="nav-item ms-4">
                <NavLink className="nav-link" to={'/register'}>Register</NavLink>
              </li> */}

            </ul>
          </div>
        </div>
      </nav >

      
    </>
  );
}

export default NavBar;
