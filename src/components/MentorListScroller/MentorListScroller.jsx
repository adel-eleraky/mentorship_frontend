import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMentors } from '../../rtk/features/mentorSlice';
import MentorCard from "../MentorCardScroller/MentorCardScroller";
import { Link } from 'react-router';

export default function MentorListScroller() {
    const dispatch = useDispatch();
    const { mentors, loading, error } = useSelector(state => state.mentor);
    const containerRef = useRef(null);
    const scrollIntervalRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(true);

    useEffect(() => {
        dispatch(fetchMentors());
    }, [dispatch]);

    const startScrolling = () => {
        if (!isScrolling) return;

        scrollIntervalRef.current = setInterval(() => {
            if (containerRef.current) {
                const container = containerRef.current;
                container.scrollBy({ top: 1, behavior: 'auto' });

                if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
                    container.scrollTo({ top: 0, behavior: 'auto' });
                }
            }
        }, 20);
    };

    const pauseScrolling = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
    };

    const handleMouseEnter = () => {
        setIsScrolling(false);
        pauseScrolling();
    };

    const handleMouseLeave = () => {
        setIsScrolling(true);
        startScrolling();
    };

    useEffect(() => {
        startScrolling();

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            pauseScrolling();
            if (container) {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [isScrolling]); 

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div
                        ref={containerRef}
                        style={{
                            height: '549px',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                    >
                        {mentors.map((mentor) => (
                            <div key={mentor._id} className="mb-3">
                                <Link style={{textDecoration: 'none'}} to={'/mentorprofile'}>
                                    <MentorCard mentor={mentor} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}