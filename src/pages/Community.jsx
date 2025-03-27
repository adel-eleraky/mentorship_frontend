import React, { useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import DiscussionList from "../components/DiscussionList/DiscussionList";
import PostsList from "../components/PostsList/PostsList";

const postsData = [
    {
        id: 1,
        author: "Mikesanders55",
        date: "March 11, 2025",
        content: "I have a mechanical engineering degree and a CS master's but low grades. What certifications should I get?",
        likes: 3,
        comments: 159,
        shares : 12,
    },
    {
        id: 2,
        author: "Learner Support",
        date: "March 12, 2025",
        content: "Tech companies are increasingly hiring remote workers. This trend is expected to continue in the future.",
        likes: 0,
        comments: 25,
        shares : 3,
    },
];

const discussionsData = [
    {
        id: 1,
        title: "How to read course reviews?",
        category: "Learner Support",
        author: "Mikesanders55",
        date: "2020-09-30T04:53:00",
        answered: false,
        views: 3200,
        likes: 5,
        replies: 9,
    },
    {
        id: 2,
        title: "Has anyone else encountered an issue where only your previous assignment is visible in 'My Submissions'?",
        category: "Learner Support",
        author: "User17423105651533749385",
        date: "2025-03-20T16:44:00",
        answered: true,
        views: 25,
        likes: 0,
        replies: 1,
    },
    {
        id: 3,
        title: "Clarification on Course Start Date and Deadlines",
        category: "Learner Support",
        author: "monotonebandz",
        date: "2024-03-24T17:57:00",
        answered: true,
        views: 16,
        likes: 0,
        replies: 1,
    },
    {
        id: 4,
        title: "Mobile App Sound keeps stopping",
        category: "Learner Support",
        author: "Kakashii007",
        date: "2021-06-09T07:03:00",
        answered: false,
        views: 656,
        likes: 3,
        replies: 15,
    },
    {
        id: 5,
        title: "I cannot download the course material",
        category: "Learner Support",
        author: "St. Green",
        date: "2024-03-06T10:12:00",
        answered: true,
        views: 1100,
        likes: 3,
        replies: 5,
    },
];

export default function Community() {
    const [activeTab, setActiveTab] = useState("Posts");
    const [sortOption, setSortOption] = useState("Most Recent Activity");

    return (
        <div className="container my-4">
            <h2 className="my-5">Our Community</h2>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="d-flex align-items-center my-3">
                {activeTab === "Discussions" && (
                    <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
                )}
            </div>

            {activeTab === "Posts" ? <PostsList posts={postsData} /> : <DiscussionList discussions={discussionsData} sortOption={sortOption} />}
        </div>
    );
}
