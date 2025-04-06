import React, { useState } from 'react'

export default function PostCard({ post }) {

    console.log(post)
    const [imageError, setImageError] = useState(false);
    return (
        <>
            <div className="post-card bg-white ">
                <div className="p-3">
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src={`http://localhost:3000/img/users/${post?.user?.image}`}
                            className="rounded-circle me-2"
                            alt="Profile"
                            style={{ width: "40px" }}
                        />
                        <div>
                            <h6 className="mb-0 fw-bold">{post?.user?.name}</h6>
                            <small className="text-muted">{new Date(post?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · <i className="fas fa-globe-americas" /></small>
                        </div>
                        <div className="ms-auto">
                            <button className="btn btn-light btn-sm"><i className="fas fa-ellipsis user-icon" /></button>
                        </div>
                    </div>
                    <p>{post.content}</p>
                    {!imageError && (
                        <img
                            src="/api/placeholder/800/500"
                            className="img-fluid rounded"
                            alt="Post Image"
                            onError={() => setImageError(true)}
                            style={{ display: imageError ? 'none' : 'block' }}
                        />
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span><i className="fas fa-thumbs-up user-icon" /> {post.reactions?.likes?.length ?? 0}</span>
                        </div>
                        <div>
                            <span>{post.comments?.comments?.length ?? 0} comments {/*· {post.shares} shares */}</span>
                        </div>
                    </div>
                </div>
                <div className="post-actions">
                    <div className="d-flex justify-content-between">
                        <button><i className="far fa-thumbs-up me-2" /> Like</button>
                        <button><i className="far fa-comment me-2" /> Comment</button>
                        <button><i className="fas fa-share me-2" /> Share</button>
                    </div>
                </div>
            </div>
        </>
    )
}
