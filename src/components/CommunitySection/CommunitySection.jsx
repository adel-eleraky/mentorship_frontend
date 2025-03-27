import React from 'react'
import { Link } from 'react-router';
import PostCard from '../PostCard/PostCard';

const posts = [
    { id: 1, content: "I have a mechanical engineering degree and a CS master's but low grades. What certifications should I get?", author: "JohnDoe", likes: 15, comments: 120, shares: 10, date: "2021-09-30T04:53:00" },
    { id: 2, content: "Tech companies are increasingly hiring remote workers. This trend is expected to continue in the future.", author: "JaneDoe", likes: 8, comments: 85, shares: 5, date: "2021-09-30T04:53:00" },
    { id: 3, content: "I have a mechanical engineering degree and a CS master's but low grades. What certifications should I get?", author: "AlexSmith", likes: 12, comments: 150, shares: 8, date: "2021-09-30T04:53:00" },
    { id: 4, content: "Tech companies are increasingly hiring remote workers. This trend is expected to continue in the future.", author: "SophiaTech", likes: 30, comments: 300, shares: 15, date: "2021-09-30T04:53:00" },
    { id: 5, content: "I have a mechanical engineering degree and a CS master's but low grades. What certifications should I get?", author: "ChrisDev", likes: 10, comments: 95, shares: 7, date: "2021-09-30T04:53:00" },
    { id: 6, content: "Tech companies are increasingly hiring remote workers. This trend is expected to continue in the future.", author: "SophiaTech", likes: 20, comments: 200, shares: 12, date: "2021-09-30T04:53:00" },
]

export default function CommunitySection() {

    return (
        <div className="community-section p-4 bg-light rounded">
            <h2 className="mb-3">Community Activities</h2>
            <div className="row">
                {posts.map((post) => (
                    <div key={post.id} className="col-md-4 mb-3">
                        <PostCard post={post} />
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
