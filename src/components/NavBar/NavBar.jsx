import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { token, logout } = useAuthentication();

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container mt-2 border-bottom border-light-subtle">
          <NavLink className="navbar-brand fs-4 bold mb-2" to={"/home"}>
            <span className="fw-bold">Mentor</span>Ship
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
            <form className="d-flex mb-2 mb-lg-0 ms-auto" role="search">
              <div style={{ position: "relative", width: "350px" }}>
                <input
                  className="form-control w-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ paddingLeft: "40px" }}
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
              </div>
            </form>

            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  For Businesses
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Mentorship for Teams
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Information for Employers
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Executive & CEO Coaching
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Fractional Executives
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item ms-4">
                <button className="btn btn-success">Browse all mentors</button>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to={'/chat'}>Chats</NavLink>
              </li> */}
              {/* <li className="nav-item ms-4">
                <NavLink className="nav-link" to={'/home'}>Log Out</NavLink>
              </li> */}
              {/* <li className="nav-item ms-4">
                <NavLink className="nav-link" to={'/register'}>Register</NavLink>
              </li> */}
              <li className="nav-item ms-4">
                <NavLink className="nav-link" to={"/login"}>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-5 py-2 shadow-sm border-bottom">
        <nav className="d-flex justify-content-between">
          <a href="#" className="nav-link">
            Engineering Mentors
          </a>
          <a href="#" className="nav-link">
            Design Mentors
          </a>
          <a href="#" className="nav-link">
            Startup Mentors
          </a>
          <a href="#" className="nav-link">
            Product Managers
          </a>
          <a href="#" className="nav-link">
            Marketing Coaches
          </a>
          <a href="#" className="nav-link">
            Leadership Mentors
          </a>
          <a href="#" className="nav-link">
            Career Coaches
          </a>
          <a href="#" className="nav-link">
            Top Mentors
          </a>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
