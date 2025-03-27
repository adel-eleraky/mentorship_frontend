import React from 'react';
import profileImg from '../../assets/profile-img.webp';
import { Link } from 'react-router-dom';

export default function MentorCardLarge({ mentor }) {
    return (
        <div className="shadow-sm p-3 border-0 rounded-3 bg-white "
        style={{
            maxWidth: "700px"
          }}
         >
            <div className="d-flex ">
                <div className="me-3">
                    <img
                        src={profileImg}
                        alt="Mentor"
                        className="rounded"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />

                </div>

                <div className="flex-grow-1">
                    <h5 className="fw-bold mb-2 second-color">
                        {mentor.name}
                    </h5>
                    <p className="mb-1  fw-medium">
                        {mentor.title}
                    </p>
                    <p className="text-success mb-2" style={{ fontSize: "14px", cursor: "pointer" }}>
                        {/* Supercharge your tech career with personalized guidance from a trusted mentor */}
                        {mentor.experience}
                    </p>

                    <p className="mb-2">
                        <i className='fa-solid fa-star  frist-color'></i>
                        <i className='fa-solid fa-star frist-color'></i>
                        <i className='fa-solid fa-star frist-color'></i>
                        <i className='fa-solid fa-star frist-color'></i>
                        <i className='fa-solid fa-star frist-color'></i>{' '}
                        {/* <span className="fw-bold">5.0</span> <span className="text-muted">(40 reviews)</span> */}
                    </p>

                    <p className="small text-muted mb-3">
                        {/* 👋 Hello, my name is {mentor.name}. I am a {mentor.title} , with more than ten years of experience in {mentor.title}... */}
                        {mentor.bio}
                    </p>

                    <div className="mb-3">
                        {mentor.skills.map((skill, index) => (
                            <span key={index} className="badge bg-light text-secondary me-2 p-2">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        {/* <p className="mb-0">
                            <span className="fw-bold fs-5">${mentor.price}</span> <small className='fw-bold'>/ session</small>
                        </p> */}
                        <Link className="btn btn-success fw-medium px-4"
                        style={{ backgroundColor: "#118577" }}
                         to={`/mentorprofile/${mentor._id}`}>View Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}