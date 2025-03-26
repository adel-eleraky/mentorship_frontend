import React from 'react'
import DiscussionCard from '../DiscussionCard/DiscussionCard';

export default function DiscussionList({ discussions, sortOption }) {
    const sortedDiscussions = [...discussions].sort((a, b) => {
        if (sortOption === "Most Recent Activity") return new Date(b.date) - new Date(a.date);
        if (sortOption === "Most Popular") return b.views - a.views;
        if (sortOption === "Answered Questions") return a.replies - b.replies;
        if (sortOption === "Unanswered Questions") return b.replies - a.replies;
        return 0;
    });

    return (
        <div>
            {sortedDiscussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
        </div>
    )
}