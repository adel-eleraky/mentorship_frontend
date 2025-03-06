import React from 'react';

export default function MentorCardScroller({ mentor }) {
    return (
        <div className="card mb-3 shadow-sm"> 
            <div className="card-body">
                <div className="d-flex">
                    <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="rounded-circle me-3"
                        style={{ width: "60px", height: "60px" }}
                    />
                    <div>
                        <h5 className="fw-bold mb-1">{mentor.name} <i className='fa fa-star fs-6 ms-3 text-success'></i> <span className="text-success fs-6">{mentor.rating}</span></h5>
                        <p className="text-muted">{mentor.title}</p>
                    </div>
                </div>
                <div className="mt-2">
                    {mentor.skills.map((skill, index) => (
                        <span key={index} className="badge bg-light text-secondary me-1">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}