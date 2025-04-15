import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, likePost, unlikePost, deletePost, editPost } from "../../rtk/features/postSlice";
import { toast } from "react-toastify";
import { Link } from "react-router";
import "./PostCard.css";

export default function PostCard({ post }) {
    const [imageError, setImageError] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content || "");
    const [editedImage, setEditedImage] = useState(null);

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const postId = post?._id;
    const isUserPost = post?.user?._id === user?._id;
    const hasLiked = post?.reactions?.likes?.some((like) => like?.user?._id === user?._id);

    const toggleComments = () => setShowComments((prev) => !prev);

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return date.toISOString().split("T")[0];
    };

    const formatTime = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const handleCreateComment = () => {
        if (!content.trim()) return;
        dispatch(createComment({ postId, content }));
        setContent("");
        toast.success("Comment added successfully", {
            position: "top-center",
            autoClose: 5000,
        });
    };

    const handleLikeToggle = (postId) => {
        if (hasLiked) {
            dispatch(unlikePost(postId))
                .unwrap()
                .then(() => toast.info("Like removed", { position: "top-center", autoClose: 3000 }))
                .catch((err) => toast.error(err.message || "Failed to unlike post"));
        } else {
            dispatch(likePost(postId))
                .unwrap()
                .then(() => toast.success("Post liked", { position: "top-center", autoClose: 3000 }))
                .catch((err) => toast.error(err.message || "Failed to like post"));
        }
    };

    const handleDeletePost = () => {
        dispatch(deletePost(postId))
            .unwrap()
            .then(() => toast.success("Post deleted successfully", { position: "top-center", autoClose: 3000 }))
            .catch((err) => toast.error(err.message || "Failed to delete post"));
    };

    const handleSaveEdit = () => {
        const formData = new FormData();
        formData.append("content", editedContent);
        if (editedImage) formData.append("image", editedImage);

        dispatch(editPost({ postId, updatedData: formData }))
            .unwrap()
            .then(() => {
                toast.success("Post updated successfully", { position: "top-center", autoClose: 3000 });
                setIsEditing(false);
            })
            .catch((err) => {
                toast.error(err || "Failed to update post", { position: "top-center", autoClose: 3000 });
            });
    };

    return (
        <>
            <div className="post-card bg-white">
                <div className="p-3">
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src={`http://localhost:3000/img/users/${post?.user?.image}`}
                            className="rounded-circle me-2"
                            alt="Profile"
                            style={{ width: "50px" }}
                        />
                        <div>
                            <Link to={`user/${post?.user?._id}/${post?.user_role}`}>
                                <h6 className="mb-0 fw-bold second-color">{post?.user?.name}</h6>
                            </Link>
                            <small className="text-muted mb-0 mx-1">{formatTime(post?.createdAt)}</small>
                            <span className="frist-color">
                                <i className="fas fa-globe-americas" />
                            </span>
                            <small className="time1 text-muted mt-0">{formatDate(post?.createdAt)}</small>
                        </div>

                        {isUserPost && (
                            <div className="ms-auto">
                                <button className="btn btn-light btn-sm" data-bs-toggle="dropdown" role="button">
                                    <i className="fas fa-ellipsis user-icon" />
                                </button>
                                <ul className="dropdown-menu">
                                    {!isEditing && (
                                        <li>
                                            <button className="dropdown-item edit-btn" onClick={() => setIsEditing(true)}>
                                                <i className="fas fa-edit" /> Edit
                                            </button>
                                        </li>
                                    )}
                                    <li>
                                        <button className="dropdown-item delete-btn mt-1" onClick={handleDeletePost}>
                                            <i className="fas fa-trash-alt" /> Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Post content + edit form */}
                    {isEditing ? (
                        <>
                            <textarea
                                className="form-control mb-2"
                                rows={3}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <input
                                type="file"
                                className="form-control mb-2"
                                accept="image/*"
                                onChange={(e) => setEditedImage(e.target.files[0])}
                            />
                            <div className="d-flex gap-2">
                                <button className="btn btn-success btn-sm" onClick={handleSaveEdit}>
                                    Save
                                </button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>{post.content}</p>
                            {post?.image && (
                                <img
                                    src={`http://localhost:3000/img/users/${post?.image}`}
                                    className="img-fluid rounded"
                                    alt="Post Image"
                                    onError={() => setImageError(true)}
                                    style={{ width: "100%", height: "400px" }}
                                />
                            )}
                        </>
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span>
                                <i className="fas fa-thumbs-up user-icon" /> {post.reactions?.likes?.length ?? 0}
                            </span>
                        </div>
                        <div>
                            <span>{post.comments?.comments?.length ?? 0} comments</span>
                        </div>
                    </div>
                </div>

                <div className="post-actions">
                    <div className="d-flex justify-content-between">
                        <button className="w-50" onClick={() => handleLikeToggle(post._id)}>
                            {hasLiked ? (
                                <i className="fa-solid fa-thumbs-up me-2 frist-color"></i>
                            ) : (
                                <i className="far fa-thumbs-up me-2 frist-color" />
                            )}
                            {hasLiked ? "Liked" : "Like"}
                        </button>
                        <button className="w-50" onClick={toggleComments}>
                            <i className="far fa-comment me-2" /> Comment
                        </button>
                    </div>
                </div>

                {showComments && (
                    <div className="comment-section">
                        {post.comments?.comments?.map((comment, index) => (
                            <div className="comment d-flex mt-3" key={comment._id || index}>
                                <img
                                    src={`http://localhost:3000/img/users/${comment?.user?.image}`}
                                    alt={comment.user?.name || "User"}
                                    className="profile-pic me-2 rounded-circle"
                                    style={{ width: 32, height: 32 }}
                                />
                                <div>
                                    <div className="comment-bubble">
                                        <div className="comment-name second-color">{comment.user?.name}</div>
                                        <span className="post-time">
                                            {comment.user?.title} <span className="frist-color">{comment.role}</span>
                                        </span>
                                        <div className="comment-text">{comment.content}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="new-comment mt-3">
                            <img
                                src={`http://localhost:3000/img/users/${user?.image}`}
                                alt="Your profile"
                                className="profile-pic me-2 rounded-circle"
                                style={{ width: 32, height: 32 }}
                            />
                            <input
                                type="text"
                                className="form-control comment-input"
                                onChange={(e) => setContent(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleCreateComment()}
                                value={content}
                                placeholder="Write a comment..."
                            />
                            <button onClick={handleCreateComment} className="btn frist-color send-comment">
                                send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
