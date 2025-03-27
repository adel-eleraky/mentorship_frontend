import React from 'react'
import profileImg from '../../assets/profile-img.png';

export default function MentorCardSmall({ mentor }) {
    return (
        <div className="card border-0 p-3">
            <img
                src={profileImg}
                alt={mentor.name}
                className="card-img-top rounded"
                style={{ height: "200px", objectFit: "contain" }}
            />
            <div className="card-body text-center">
                <h5 className="card-title fw-bold second-color">{mentor.name}</h5>
                <p className="card-text text-muted">{mentor.title}</p>
                <div className="d-flex flex-wrap justify-content-center mt-2">
                    {mentor.skills.map((skill, index) => (
                        <span key={index} className="badge bg-light text-secondary m-1 ms-0 py-1">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
