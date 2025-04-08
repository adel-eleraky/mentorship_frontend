import React from 'react';
import profileImg from '../../assets/profile-img.png';
import { Link } from 'react-router';

export default function CareerCoachSection() {
    return (
        <div className="container py-3 py-md-5">
            <div className="d-flex flex-column flex-md-row align-items-center bg-light p-3 p-md-5 rounded shadow-sm">
                {/* Mentor Profile Card */}
                <div className="position-relative d-inline-block mb-4 mb-md-0 mx-auto mx-md-0 me-md-5" style={{ maxWidth: '350px' }}>
                    {/* Rotated background div */}
                    <div
                        className="shadow-sm position-absolute top-0 start-0 w-100 h-100 rounded-3 bg-white"
                        style={{ transform: "rotate(5deg)", zIndex: 1 }}
                    ></div>

                    {/* Mentor card content */}
                    <div className="shadow-sm rounded-3 p-3 position-relative bg-white" style={{ zIndex: 2 }}>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src={profileImg}
                                alt="Mentor"
                                className="rounded-circle me-3"
                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                            />
                            <div>
                                <h6 className="mb-0 fw-bold">Sanjeev Subedi</h6>
                                <p className="text-muted mb-0 small">Staff Software Engineer</p>
                            </div>
                        </div>
                        <div className="bg-light p-2 mb-2 rounded">
                            <span className="fw-bold">Mentorship</span> <span className="text-success">$240/month</span>
                        </div>
                        <hr />
                        <div className="bg-light p-2 mb-2 rounded">Intro Session</div>
                        <div className="bg-light p-2 mb-2 rounded">CV Review</div>
                        <div className="bg-light p-2 rounded">Expert Session</div>
                    </div>
                </div>

                {/* Information Section */}
                <div className="text-center text-md-start" style={{ flex: 1 }}>
                    <h2 className="fw-bold mb-3 second-color ">At your fingertips: a dedicated career coach</h2>
                    <p className="text-muted mb-4">
                        Want to start a new dream career? Successfully build your startup? Itching to learn high-demand skills?
                        Work smart with an online mentor by your side to offer expert advice and guidance to match your zeal.
                        Become unstoppable using MentorCruise.
                    </p>

                    <div className="row g-3 mb-4">
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center">
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check frist-color"></i></span>
                                <span className='second-color '>Thousands of mentors available</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center">
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check frist-color"></i></span>
                                <span className='second-color '>Flexible program structures</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center">
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check frist-color"></i></span>
                                <span className='second-color '>Free trial</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center">
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check frist-color"></i></span>
                                <span className='second-color '>Personal chats</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center">
                                <span className="text-success frist-color me-2"><i className="fa-solid fa-circle-check frist-color"></i></span>
                                <span className='second-color '>1-on-1 calls</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center">
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check frist-color "></i></span>
                                <span className='second-color '>96% satisfaction rate</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Link className="btn btn-success" to={'/mentors'} style={{ backgroundColor: ' #118577' }}>
                            <span className="fw-semibold">Find a mentor</span> <i className="fa-solid fa-arrow-right ms-1"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}