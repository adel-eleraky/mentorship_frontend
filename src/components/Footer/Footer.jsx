import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-light text-dark py-5"
      style={{ lineHeight: "2" }}
    >
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4">
            <h4>
              <span className="fw-bold second-color">Mentor</span>
              <span className="frist-color">Ship</span>
            </h4>
            <p className="text-secondary">
              Your trusted source to find highly-vetted mentors & industry
              professionals to move your career ahead.
            </p>
            <div className="d-flex gap-3">
              <i className="fa-brands fa-facebook frist-color fs-4"></i>
              <i className="fa-brands fa-instagram frist-color fs-4"></i>
              <i className="fa-brands fa-twitter frist-color fs-4"></i>
              <i className="fa-brands fa-linkedin frist-color fs-4"></i>
            </div>
          </div>

          <div className="col-md-2">
            <h6 className="fw-bold second-color">PLATFORM</h6>
            <ul className="list-unstyled">
              <li>Browse Mentors</li>
              <li>Book a Session</li>
              <li>Become a Mentor</li>
              <li>Mentorship for Teams</li>
              <li>Testimonials</li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold second-color">RESOURCES</h6>
            <ul className="list-unstyled">
              <li>Newsletter</li>
              <li>Books</li>
              <li>Perks</li>
              <li>Templates</li>
              <li>Career Paths</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold second-color">COMPANY</h6>
            <ul className="list-unstyled">
              <li>About</li>
              <li>Case Studies</li>
              <li>Partner Program</li>
              <li>Code of Conduct</li>
              <li>Privacy Policy</li>
              <li>DMCA</li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="mb-1">
              <h6 className="fw-bold second-color">SUPPORT</h6>
              <ul className="list-unstyled">
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h6 className="fw-bold second-color">EXPLORE</h6>
              <ul className="list-unstyled">
                <li>Groups</li>
                <li>Companies</li>
                <li>Fractional Executives</li>
                <li>Part-Time Experts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row text-center mt-1">
          <div className="col">
            <p className="text-muted">
              © 2025{" "}
              <a href="#" className="frist-color fw-bold">
                MentorShip
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
