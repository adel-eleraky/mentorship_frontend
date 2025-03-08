import React from 'react'
import profileImg from '../../assets/profile-img.webp';
import MentorCard from "../MentorCard/MentorCard";

const mentors = [
    {
        name: "Sanjeev Subedi",
        title: "Staff Software Engineer at eBay",
        image: profileImg,
        skills: ["JavaScript", "Typescript", "Angular"],
    },
    {
        name: "Jennifer Nguyen",
        title: "Principal Data Scientist at Microsoft",
        image: profileImg,
        skills: ["Data Science", "Data Analysis", "Machine Learning"],
    },
    {
        name: "Mike Poole",
        title: "Fullstack Developer at Yachting Limited",
        image: profileImg,
        skills: ["HTML", "CSS", "SASS"],
    },
    {
        name: "Praveen Dubey",
        title: "Senior Software Engineer at Microsoft",
        image: profileImg,
        skills: ["JavaScript", "Typescript", "React"],
    },
    {
        name: "Sanjeev Subedi",
        title: "Staff Software Engineer at eBay",
        image: profileImg,
        skills: ["JavaScript", "Typescript", "Angular"],
    },
    {
        name: "Jennifer Nguyen",
        title: "Principal Data Scientist at Microsoft",
        image: profileImg,
        skills: ["Data Science", "Data Analysis", "Machine Learning"],
    },
    {
        name: "Mike Poole",
        title: "Fullstack Developer at Yachting Limited",
        image: profileImg,
        skills: ["HTML", "CSS", "SASS"],
    },
    {
        name: "Praveen Dubey",
        title: "Senior Software Engineer at Microsoft",
        image: profileImg,
        skills: ["JavaScript", "Typescript", "React"],
    },
];

export default function MentorsSection() {
    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between mb-5">
                <div style={{ position: 'relative', width: '50%' }}>
                    <input
                        className="form-control w-100"
                        type="search"
                        placeholder="Search mentors"
                        style={{ paddingLeft: '40px' }}
                    />
                    <i
                        className="fas fa-search"
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#cbcbcb',
                            pointerEvents: 'none',
                        }}
                    ></i>
                </div>
                <button className="btn btn-success">View all mentors</button>
            </div>

            <div className="row g-4">
                {mentors.map((mentor, index) => (
                    <div key={index} className="col-md-3">
                        <MentorCard mentor={mentor} />
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-outline-success px-4 py-2 fw-bold">Explore all mentors</button>
            </div>
        </div>
    );
}
