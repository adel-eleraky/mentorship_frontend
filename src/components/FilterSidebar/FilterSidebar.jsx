import React, { useMemo, useState } from 'react';

const skillsData = [
    "JavaScript",
    "React",
    "NodeJs",
    "Python",
    "Data Science",
    "UI/UX Design",
    "Leadership",
    "Product Management",
    "Frontend",
    "Product Strategy",
    "Startup",
    "Career",
];

const jobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Product Manager",
    "Marketing Specialist",
    "Data Scientist",
    "DevOps Engineer",
    "UI/UX Designer",
    "Mobile Developer",
    "QA Engineer",
    "Technical Writer",
];

const experienceLevels = ["Junior", "Senior", "Expert"];

export default function FilterSidebar({
    search,
    setSearch,
    selectedSkills,
    setSelectedSkills,
    selectedJobTitles,
    setSelectedJobTitles,
    selectedExperience,
    setSelectedExperience,
    priceRange,
    setPriceRange,
}) {
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllJobTitles, setShowAllJobTitles] = useState(false);

    const handleCheckboxChange = (list, setList, value) => {
        setList((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    const filteredSkills = useMemo(() => 
        skillsData.filter((skill) =>
            skill.toLowerCase().includes(search.toLowerCase())
        ), [search]);

    const filteredJobTitles = useMemo(() => 
        jobTitles.filter((title) =>
            title.toLowerCase().includes(search.toLowerCase())
        ), [search]);

    const visibleSkills = showAllSkills ? filteredSkills : filteredSkills.slice(0, 6);
    const visibleJobTitles = showAllJobTitles ? filteredJobTitles : filteredJobTitles.slice(0, 6);

    return (
        <div className="p-4 rounded-3 shadow-sm bg-white">
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control border"
                    placeholder="Search for any skill, title or price"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="mb-4">
                <h5 className="mb-3">Skills</h5>
                <ul className="list-unstyled">
                    {visibleSkills.map((skill, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`skill-${skill}`}
                                    checked={selectedSkills.includes(skill)}
                                    onChange={() => handleCheckboxChange(selectedSkills, setSelectedSkills, skill)}
                                />
                                <label className="form-check-label" htmlFor={`skill-${skill}`}>
                                    {skill}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
                {filteredSkills.length > 6 && ( 
                    <button
                        className="btn btn-link p-0 text-success"
                        onClick={() => setShowAllSkills(!showAllSkills)}
                    >
                        {showAllSkills ? "See Less" : "See More"}
                    </button>
                )}
            </div>

            <div className="mb-4">
                <h5 className="mb-3">Job Titles</h5>
                {visibleJobTitles.map((title, index) => (
                    <div key={index} className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`job-title-${title}`}
                            checked={selectedJobTitles.includes(title)}
                            onChange={() => handleCheckboxChange(selectedJobTitles, setSelectedJobTitles, title)}
                        />
                        <label className="form-check-label" htmlFor={`job-title-${title}`}>
                            {title}
                        </label>
                    </div>
                ))}
                {filteredJobTitles.length > 6 && ( 
                    <button
                        className="btn btn-link p-0 text-success"
                        onClick={() => setShowAllJobTitles(!showAllJobTitles)}
                    >
                        {showAllJobTitles ? "See Less" : "See More"}
                    </button>
                )}
            </div>

            <div className="mb-4">
                <h5 className="mb-3">Experience Level</h5>
                {experienceLevels.map((level, index) => (
                    <div key={index} className="form-check mb-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            id={`experience-${level}`}
                            name="experience"
                            checked={selectedExperience === level}
                            onChange={() => setSelectedExperience(level)}
                        />
                        <label className="form-check-label" htmlFor={`experience-${level}`}>
                            {level}
                        </label>
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <h5 className="mb-3">Price Range</h5>
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1 me-3">
                        <input
                            type="range"
                            className="form-range"
                            min={50}
                            max={500}
                            step={10}
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                        />
                    </div>
                    <div>
                        <span className="fw-bold">${priceRange} / month</span>
                    </div>
                </div>
            </div>
        </div>
    );
}