import React from 'react'
import { Link } from 'react-router';
import DiscussionCard from '../DiscussionCard/DiscussionCard';
import { date } from 'yup';

export default function CommunitySection() {
        const discussions = [
        { id: 1, title: "How to get started in Frontend?", author: "JohnDoe", replies: 15, views: 120, likes: 10, date: "2021-09-30T04:53:00" },
        { id: 2, title: "Best practices for React performance", author: "JaneDoe", replies: 8, views: 85, likes: 5, date: "2021-09-30T04:53:00" },
        { id: 3, title: "How to switch from backend to fullstack?", author: "AlexSmith", replies: 12, views: 150, likes: 8, date: "2021-09-30T04:53:00" },
        { id: 4, title: "Career path for a junior developer", author: "SophiaTech", replies: 30, views: 300, likes: 15, date: "2021-09-30T04:53:00" },
        { id: 5, title: "Is TypeScript worth learning?", author: "ChrisDev", replies: 10, views: 95, likes: 7, date: "2021-09-30T04:53:00" },
        { id: 6, title: "Career path for a junior developer", author: "SophiaTech", replies: 20, views: 200, likes: 12, date: "2021-09-30T04:53:00" },
    ]

    return (
        <div className="community-section p-4 bg-light rounded">
            <h2 className="mb-3">Community Activity</h2>
            <div className="row">
                {discussions.map((discussion) => (
                    <div key={discussion.id} className="col-md-4 mb-3">
                        <DiscussionCard discussion={discussion} />
                    </div>
                ))}
            </div>
            <div className="mt-3 text-center">
                <Link className="btn btn-success px-4 py-2 fw-bold" to={"/community"}>
                    Go to Community
                </Link>
            </div>
        </div>
    )
}
