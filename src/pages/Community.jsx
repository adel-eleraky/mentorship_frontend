import React, { useEffect } from "react";
import profileImg from "../assets/profile-img.png";
import backgroundImg from "../assets/background-img.jpg";
import PostsList from "../components/PostsList/PostsList";
import CreatePostSection from "../components/CreatePostSection/CreatePostSection";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../rtk/features/postSlice";

const profileData = {
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    location: "New York, USA",
    institute: "ITI",
    image: profileImg,
    background: backgroundImg,
};

const postsData = [
    {
        id: 1,
        author: "Mikesanders55",
        date: "March 11, 2025",
        content: "I have a mechanical engineering degree and a CS master's but low grades. What certifications should I get?",
        likes: 3,
        comments: 159,
        shares: 12,
    },
    {
        id: 2,
        author: "Learner Support",
        date: "March 12, 2025",
        content: "Tech companies are increasingly hiring remote workers. This trend is expected to continue in the future.",
        likes: 0,
        comments: 25,
        shares: 3,
    },
];


export default function Community() {
    const { id, name, title, location, institute, image, background } = profileData;

    
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const { user } = useSelector(state => state.auth)
    
    console.log(user)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [])
    return (
        <div className="container my-4">
            <div className="row mt-2">
                {/* Left Sidebar - Profile Card */}
                <div className="col-md-5 col-lg-4 mb-4">
                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="relative w-full h-32 bg-gray-200">
                            <img
                                src={background}
                                alt="background"
                                style={{ width: "100%", height: "150px", objectFit: "cover" }}
                            />
                        </div>

                        <div className="flex flex-col items-center " style={{ zIndex: 1, position: "relative", top: "-45px", left: "30px" }}>
                            <Link to={`user/${user?._id}`}>
                                <img
                                    src={`http://localhost:3000/img/users/${user?.image}`}
                                    alt={user?.name}
                                    className="border-4 border-white rounded-circle shadow-md object-cover bg-white"
                                    style={{ width: '90px' }}
                                />
                            </Link>
                        </div>

                        <div className="text-start p-4 pt-0">
                            <h2 className="text-xl font-semibold second-color">{user?.name}</h2>
                            <p className="text-gray-600 text-sm">{user?.title}</p>
                            {/* <p className="text-muted text-sm">{location}</p> */}
                            {/* <p className="text-sm font-medium">{institute}</p> */}
                        </div>
                    </div>
                </div>

                {/* Right Content - Posts */}
                <div className="col-md-7 col-lg-8">
                    {/* Create Post */}
                    <CreatePostSection />

                    {/* Posts */}
                    <PostsList posts={[...posts].reverse()} />
                </div>
            </div>
        </div>
    );
}