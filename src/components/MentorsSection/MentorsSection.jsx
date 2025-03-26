import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchMentors } from '../../rtk/features/mentorSlice';
import MentorCard from "../MentorCardSmall/MentorCardSmall";
import { Link } from 'react-router';

export default function MentorsSection() {
    const dispatch = useDispatch();
    const { mentors, loading, error } = useSelector(state => state.mentor);
    const [visibleCount, setVisibleCount] = useState(8);
    
    useEffect(() => {
        dispatch(fetchMentors());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                {mentors.slice(0, visibleCount).map((mentor) => (
                    <div key={mentor._id} className="col-md-3">
                        <Link style={{textDecoration: 'none'}} to={'/mentorprofile'}>
                            <MentorCard mentor={mentor} />
                        </Link>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-5">
                <Link className="btn btn-outline-success px-4 py-2 fw-bold" to={'/mentors'}>View all mentors</Link>
            </div>
        </div>
    );
}
