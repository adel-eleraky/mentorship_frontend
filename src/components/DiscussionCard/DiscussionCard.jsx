import React from 'react'

export default function DiscussionCard({ discussion }) {
    return (
        <div className="border-bottom py-3">
            <h6 className="text-success">{discussion.title}</h6>
            <p className="text-muted small">
                {discussion.category} · {discussion.author} · {new Date(discussion.date).toLocaleString()}
            </p>
            <div className="d-flex gap-3 text-muted mt-2">
                <span><i className="fa-solid fa-eye"></i> {discussion.views}</span>
                <span><i className="fa-solid fa-thumbs-up"></i> {discussion.likes}</span>
                <span><i className="fa-solid fa-comments"></i> {discussion.replies}</span>
                {discussion.answered && <span className="text-success"><i class="fa-solid fa-check"></i> Answered</span>}
            </div>
        </div>
    )
}
