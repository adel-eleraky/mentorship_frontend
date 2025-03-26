import React from 'react'

export default function PostCard({post}) {
    return (
        <div className="post-card p-4 border rounded shadow-sm mb-4 bg-white">
            <div className="d-flex align-items-center mb-2">
                <span className="fw-bold text-success">{post.category}</span>
                <span className="text-muted ms-2"> • {post.author} at {post.date}</span>
            </div>

            <h5 className="fw-bold">{post.title}</h5>
            <p className="text-dark">{post.content}</p>

            <div className="mt-3">
                {post.tags.map((tag, index) => (
                    <span key={index} className="badge bg-success me-2">{tag}</span>
                ))}
            </div>

            <div className="d-flex justify-content-between mt-3 text-muted">
                <div>
                    <span className="me-3"><i className="fa-solid fa-thumbs-up"></i> Like</span>
                    <span className="me-3"><i className="fa-solid fa-comments"></i> Answer</span>
                    <span><i class="fa-solid fa-share-nodes"></i> Share</span>
                </div>
                <div>
                    <span>{post.answers} answers • {post.views} views</span>
                </div>
            </div>
        </div>
    )
}
