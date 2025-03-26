import React from 'react'

export default function Tabs({ activeTab, setActiveTab }) {
    return (
        <>
            <div className="d-flex border-bottom mb-3">
                <button
                    className={`btn ${activeTab === "Posts" ? "fw-bold text-success" : "text-muted"}`}
                    onClick={() => setActiveTab("Posts")}
                >
                    Posts
                </button>
                <button
                    className={`btn ${activeTab === "Discussions" ? "fw-bold text-success" : "text-muted"}`}
                    onClick={() => setActiveTab("Discussions")}
                >
                    Discussions
                </button>
            </div>
        </>
    );
}
