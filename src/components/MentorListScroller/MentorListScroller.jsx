import React, { useEffect, useRef } from 'react';
import profileImg from '../../assets/profile-img.webp';
import MentorCard from "../MentorCardScroller/MentorCardScroller";

const mentors = [
    {
        name: "Takuya Kitazawa",
        title: "Freelance Software Developer at ex-Amazon",
        rating: "5.0",
        skills: ["Machine Learning", "Product Management", "Data Science"],
        image: profileImg,
    },
    {
        name: "Nicholas Busman",
        title: "Lead UX Designer",
        rating: "5.0",
        skills: ["UX Design", "UI Design", "Prototyping"],
        image: profileImg,
    },
    {
        name: "Juliette Weiss",
        title: "Product Design Leader at Moderna, ex-Microsoft",
        rating: "5.0",
        skills: ["Product Design", "UX Research"],
        image: profileImg,
    },
    {
        name: "Juliette Weiss",
        title: "Product Design Leader at Moderna, ex-Microsoft",
        rating: "5.0",
        skills: ["Product Design", "UX Research"],
        image: profileImg,
    },
    {
        name: "Juliette Weiss",
        title: "Product Design Leader at Moderna, ex-Microsoft",
        rating: "5.0",
        skills: ["Product Design", "UX Research"],
        image: profileImg,
    },
];

export default function MentorListScroller() {
    const containerRef = useRef(null);
    const scrollIntervalRef = useRef(null); 

    useEffect(() => {
        const container = containerRef.current;

        const startScrolling = () => {
            scrollIntervalRef.current = setInterval(() => {
                if (container) {
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

        startScrolling();

        container.addEventListener('mouseenter', pauseScrolling);
        container.addEventListener('mouseleave', startScrolling);

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
            container.removeEventListener('mouseenter', pauseScrolling);
            container.removeEventListener('mouseleave', startScrolling);
        };
    }, []);

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
                        {mentors.map((mentor, index) => (
                            <div key={index} className="mb-3">
                                <MentorCard mentor={mentor} />
                            </div>
                        ))}
                        {mentors.map((mentor, index) => (
                            <div key={`duplicate-${index}`} className="mb-3">
                                <MentorCard mentor={mentor} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}