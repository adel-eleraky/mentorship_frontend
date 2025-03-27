import React from 'react';
import profileImg from '../../assets/profile-img.png';
import { Link } from 'react-router';

export default function CareerCoachSection() {
    return (
        <div className="container p-5">
            <div className="d-flex align-items-center bg-light p-5 rounded shadow-sm">
                <div className="position-relative d-inline-block ms-2 me-5">
                    <div
                        className="shadow-sm position-absolute top-0 start-0 w-100 h-100 rounded-3 bg-white"
                        style={{ transform: "rotate(5deg)" }}
                    ></div>

                    <div className="shadow-sm rounded-3 p-3 position-relative bg-white">
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src={profileImg}
                                alt="Mentor"
                                className="rounded-circle me-3"
                                style={{ width: '70px' }}
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

                <div style={{ width: '60%', paddingLeft: '20px', lineHeight: '2' }}>
                    <h2 className="fw-bold">At your fingertips: a dedicated career coach</h2>
                    <p className="text-muted">
                        Want to start a new dream career? Successfully build your startup? Itching to learn high-demand skills?
                        Work smart with an online mentor by your side to offer expert advice and guidance to match your zeal.
                        Become unstoppable using MentorCruise.
                    </p>

                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>
                                Thousands of mentors available
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>
                                Flexible program structures
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>
                                Free trial
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>
                                Personal chats
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>
                                1-on-1 calls
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>
                                96% satisfaction rate
                            </div>
                        </div>
                    </div>

                    <Link className="btn btn-success mt-4" to={'/mentors'}>
                        <span className="fw-semibold">Find a mentor</span> <i class="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}