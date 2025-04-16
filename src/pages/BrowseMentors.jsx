import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMentors } from '../rtk/features/mentorSlice';
import MentorCard from '../components/MentorCardLarge/MentorCardLarge';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import Loader from '../components/Loader/Loader';
export default function BrowseMentors() {
    const dispatch = useDispatch();
    const { mentors, loading, error } = useSelector(state => state.mentor);
    const [search, setSearch] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedJobTitles, setSelectedJobTitles] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(25);
    const [priceRange, setPriceRange] = useState(250);
    const [currentPage, setCurrentPage] = useState(1);
    const mentorsPerPage = 5;

    useEffect(() => {
        dispatch(fetchMentors());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedSkills, selectedJobTitles, selectedExperience, priceRange]);

    const parseExperience = (experience) => {
        if (!experience) return 0;
        const match = experience.match(/(\d+)\+?/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const filteredMentors = mentors.filter((mentor) => {
        const matchesSearch = mentor.name?.toLowerCase().includes(search?.toLowerCase()) ||
                              mentor.title?.toLowerCase().includes(search?.toLowerCase()) ||
                              mentor.bio?.toLowerCase().includes(search?.toLowerCase());

        const matchesSkills = selectedSkills.length === 0 ||
                              selectedSkills.every((skill) => mentor.bio?.toLowerCase().includes(skill?.toLowerCase()));

        const matchesJobTitles = selectedJobTitles.length === 0 ||
                                 selectedJobTitles.includes(mentor.title);

        const mentorExperience = parseExperience(mentor.experience);
        const matchesExperience = mentorExperience ? mentorExperience <= selectedExperience : true;

        const matchesPrice = mentor.price ? mentor.price <= priceRange : true;

        return matchesSearch && matchesSkills && matchesJobTitles && matchesExperience && matchesPrice;
    });

    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);
    const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (loading) return <> <Loader/>  </>;
    if (error) return <div>Error: {error}</div>;

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
                        {currentMentors.map((mentor) => (
                            <MentorCard key={mentor._id} mentor={mentor} />
                        ))}
                    </div>

                    {/* Styled Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link me-1 second-color" onClick={handlePrev}>
                                            Previous
                                        </button>
                                    </li>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                        >
                                            <button
                                                className="page-link me-1"
                                                onClick={() => setCurrentPage(index + 1)}
                                                style={{
                                                    backgroundColor: currentPage === index + 1 ? '#118577' : 'transparent',
                                                    color: currentPage === index + 1 ? '#fff' : '#118577',
                                                    borderColor: '#118577'
                                                }}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link me-1 second-color" onClick={handleNext}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
