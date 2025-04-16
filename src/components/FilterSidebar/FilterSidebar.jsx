import React, { useMemo, useState } from 'react';

const skillsData = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "HTML/CSS",
    "Data Science",
    "UI/UX Design",
    "Django",
    "Product Management",
    "Frontend",
    "Product Strategy",
    "Agile",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "Agile Methodology",
    "Scrum",
    "Product Roadmaps",
    "JIRA",
    "User Stories",
    "Machine Learning",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Figma",
    "Adobe XD",
    "User Research",
    "Wireframing",
    "Prototyping",
    "SEO",
    "Content Marketing",
    "Social Media Strategy",
    "Google Analytics",
    "Email Marketing",
    "Ethical Hacking",
    "Network Security",
    "Penetration Testing",
    "Firewalls",
    "Encryption",
    "AWS",
    "Azure",
    "Cloud Infrastructure",
    "DevOps",
    "Kubernetes",
    "Vue.js",
    "Responsive Design",
];

const jobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Product Manager",
    "Software Engineer",
    "Marketing Specialist",
    "Data Scientist",
    "DevOps Engineer",
    "UX/UI Designer",
    "Software Architect",
    "Technical Writer",
    "Digital Marketing Specialist",
    "Content Strategist",
    "Cloud Engineer",
    "Marketing Strategist",
    "Cybersecurity Specialist",
    "Full-Stack Developer",
    "Cloud Architect",
    "AI Researcher",
    "Mobile App Developer",
    "Blockchain Developer",
    "Game Developer",
    "Data Engineer",
    "QA Engineer",
    "Technical Writer",
];

export default function FilterSidebar({
    search,
    setSearch,
    selectedSkills,
    setSelectedSkills,
    selectedJobTitles,
    setSelectedJobTitles,
    selectedExperience,
    setSelectedExperience,
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

    const handleExperienceChange = (e) => {
        setSelectedExperience(e.target.value);
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
                    placeholder="Search for any skill or job title"
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
                        className="btn btn-link p-0 frist-color"
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
                        className="btn btn-link p-0 frist-color"
                        onClick={() => setShowAllJobTitles(!showAllJobTitles)}
                    >
                        {showAllJobTitles ? "See Less" : "See More"}
                    </button>
                )}
            </div>

            <div className="mb-4">
                <h5 className="mb-3">Experience Level</h5>
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1 me-3">
                        <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={30}
                            step={1}
                            value={selectedExperience}
                            onChange={handleExperienceChange}
                        />
                    </div>
                    <div>
                        <span className="fw-bold">{selectedExperience} years</span>
                    </div>
                </div>
            </div>

            {/* <div className="mb-4">
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
                        <span className="fw-bold">${priceRange} / session</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}