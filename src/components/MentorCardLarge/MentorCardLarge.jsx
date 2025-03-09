import React from 'react';
import profileImg from '../../assets/profile-img.webp';
import { Link } from 'react-router';

export default function MentorCardLarge({ mentor }) {
    return (
        <div className="shadow-sm p-3 border-0 rounded-3 bg-white" style={{ maxWidth: "700px" }}>
            <div className="d-flex">
                <div className="me-3">
                    <img
                        src={profileImg}
                        alt="Mentor"
                        className="rounded"
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>

                <div className="flex-grow-1">
                    <h5 className="fw-bold">
                        {mentor.name}
                    </h5>
                    <p className="mb-1 text-muted">
                        {mentor.title}
                    </p>
                    <p className="text-success" style={{ fontSize: "14px", cursor: "pointer" }}>
                        Supercharge your tech career with personalized guidance from a trusted mentor
                    </p>

                    <p className="mb-1">
                        <i className='fa-solid fa-star text-warning'></i>
                        <i className='fa-solid fa-star text-warning'></i>
                        <i className='fa-solid fa-star text-warning'></i>
                        <i className='fa-solid fa-star text-warning'></i>
                        <i className='fa-solid fa-star text-warning'></i>{' '}
                        <span className="fw-bold">5.0</span> <span className="text-muted">(40 reviews)</span>
                    </p>

                    <p className="small text-muted">
                        👋 Hello, my name is {mentor.name}. I am a software engineer based in Switzerland, with more than ten years of experience in software engineering...
                    </p>
                </div>
            </div>

            <div className="mt-2">
                {mentor.skills.map((skill, index) => (
                    <span key={index} className="badge bg-light text-secondary me-2 p-2">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0">
                    <small className="text-muted">Starting from</small> <br />
                    <span className="fw-bold fs-5">${mentor.price}</span> <small>/ month</small>
                </p>
                <Link className="btn btn-success px-4" to={'mentorprofile'}>View Profile</Link>
            </div>
        </div>
    )
}