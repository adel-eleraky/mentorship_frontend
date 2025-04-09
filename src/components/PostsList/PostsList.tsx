import React from 'react'
import PostCard from '../PostCard/PostCard'

export default function PostsList({ posts }) {
    
    console.log(posts)
    console.log(posts.comments?.comments?.content??"no comments")

    return (
        <div className="container">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
