import React from 'react'
import PostCard from '../PostCard/PostCard'

export default function PostsList({ posts }) {
    
    console.log(posts)
    return (
        <div className="container mt-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
