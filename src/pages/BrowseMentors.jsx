import React, { useState } from 'react';
import MentorCard from '../components/MentorCardLarge/MentorCardLarge';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';

const mentors = [
    {
        name: "Mladen Ruzicic",
        title: "Senior Frontend Developer",
        skills: ["Frontend", "JavaScript", "React"],
        level: "Senior",
        price: 150,
        rating: 5.0,
        reviews: 40,
    },
    {
        name: "John Doe",
        title: "Product Manager",
        skills: ["Product Management", "Startup"],
        level: "Senior",
        price: 200,
        rating: 4.8,
        reviews: 35,
    },
    {
        name: "Jane Smith",
        title: "Backend Developer",
        skills: ["Backend", "NodeJS", "Express"],
        level: "Expert",
        price: 180,
        rating: 4.9,
        reviews: 50,
    },
]

export default function BrowseMentors() {
    const [search, setSearch] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedJobTitles, setSelectedJobTitles] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState("");
    const [priceRange, setPriceRange] = useState(250);

    const filteredMentors = mentors.filter((mentor) => {
        const matchesSearch = mentor.name.toLowerCase().includes(search.toLowerCase()) ||
                                mentor.title.toLowerCase().includes(search.toLowerCase()) ||
                                mentor.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()));

        const matchesSkills = selectedSkills.length === 0 ||
                                selectedSkills.every((skill) => mentor.skills.includes(skill));

        const matchesJobTitles = selectedJobTitles.length === 0 ||
                                    selectedJobTitles.includes(mentor.title);

        const matchesExperience = selectedExperience === "" || selectedExperience === mentor.level;

        const matchesPrice = mentor.price <= priceRange;

        return matchesSearch && matchesSkills && matchesJobTitles && matchesExperience && matchesPrice;
    });

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-4">
                    <FilterSidebar
                        search={search}
                        setSearch={setSearch}
                        selectedSkills={selectedSkills}
                        setSelectedSkills={setSelectedSkills}
                        selectedJobTitles={selectedJobTitles}
                        setSelectedJobTitles={setSelectedJobTitles}
                        selectedExperience={selectedExperience}
                        setSelectedExperience={setSelectedExperience}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                </div>

                <div className="col-md-8">
                    <div className="d-flex flex-wrap gap-3">
                        {filteredMentors.map((mentor, index) => (
                            <MentorCard key={index} mentor={mentor} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}