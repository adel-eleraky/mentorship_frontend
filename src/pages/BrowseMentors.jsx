import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMentors } from '../rtk/features/mentorSlice';
import MentorCard from '../components/MentorCardLarge/MentorCardLarge';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';

export default function BrowseMentors() {
    const dispatch = useDispatch();
    const { mentors, loading, error } = useSelector(state => state.mentor);
    const [search, setSearch] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedJobTitles, setSelectedJobTitles] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(25);
    const [priceRange, setPriceRange] = useState(250);
    
    useEffect(() => {
        dispatch(fetchMentors());
    }, [dispatch]);

    const parseExperience = (experience) => {
        if (!experience) return 0;
        const match = experience.match(/(\d+)\+?/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const filteredMentors = mentors.filter((mentor) => {
        const matchesSearch = mentor.name.toLowerCase().includes(search.toLowerCase()) ||
                              mentor.title.toLowerCase().includes(search.toLowerCase()) ||
                              mentor.bio.toLowerCase().includes(search.toLowerCase());

        // const matchesSkills = selectedSkills.length === 0 ||
        //                       selectedSkills.every((skill) => mentor.bio.toLowerCase().includes(skill.toLowerCase()));

        const matchesJobTitles = selectedJobTitles.length === 0 ||
                                 selectedJobTitles.includes(mentor.title);

        const mentorExperience = parseExperience(mentor.experience);
        const matchesExperience = mentorExperience ? mentorExperience <= selectedExperience : true;

        const matchesPrice = mentor.price ? mentor.price <= priceRange : true;

        return matchesSearch && matchesJobTitles && matchesExperience && matchesPrice;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-4">
                    <FilterSidebar
                        search={search}
                        setSearch={setSearch}
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
                        {filteredMentors.map((mentor) => (
                            <MentorCard key={mentor._id} mentor={mentor} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}