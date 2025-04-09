import React, { use, useEffect, useState } from 'react'
import './UserProfile.css'
import { useParams } from 'react-router'
import axios from 'axios'
import PostsList from '../../../components/PostsList/PostsList'
import CreatePostSection from '../../../components/CreatePostSection/CreatePostSection'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts, getUserProfile } from '../../../rtk/features/postSlice'
import { getUser } from '../../../rtk/features/userSlice'
import { getMentor } from '../../../rtk/features/mentorSlice'


function CommunityUserProfile() {

  const { id, role } = useParams()
  const dispatch = useDispatch()
  const { userPosts , loading , userProfile} = useSelector(state => state.post)
  const { user: authUser } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user)
  const { mentor } = useSelector(state => state.mentor)
  
  // const [userData , setUserData] = useState("")
  
  
  // const fetchUserPosts = async () => {
  //   const res = await axios.get(`http://localhost:3000/api/v1/users/${id}/posts`)
  //   return res.data
  // }

  useEffect(() => {

    dispatch(getUserPosts(id))
    // if(role == "User") {
    //   dispatch(getUser(id))
    //   setUserData(user)

    // }else if(role == "Mentor") {
    //   dispatch(getMentor(id))
    //   setUserData(mentor)

    // }
    dispatch(getUserProfile({ id , role}))

    // if(role == "User") {
    //   setUserData(user)
    // } else if(role == "Mentor") {
    //   setUserData(mentor)
    // }
    // fetchUserPosts().then((data) => {
    //   setPosts(data.data)
    // })
  }, [id ,role , loading])

  return (
    <>
 <div className=" user-pro ">
  <div className="cover-photo">
    <div className='container'>
    <img src={`http://localhost:3000/img/users/${userProfile?.image}`} className="profile-picture" alt="Profile Picture" />


    </div>
  </div>
  {/* Profile Info */}
  <div className='container'>
  <div className="profile-info ">
    <div className="d-flex justify-content-between align-items-end">
      <div>
        <h1 className="fw-bold mb-0 second-color">{userProfile?.name}</h1>
        <h5>{userProfile?.title}</h5>
        {/* <div>
          <span className="text-muted mb-0">123 Following : </span>
          <span className="text-muted mb-0"> 1500 Followers </span>
        </div> */}
      </div>
      <div>
        {/* <button className="btn  user-follow me-2"><i className="fas fa-plus" /> Follow</button> */}
        {/* <button className="btn btn-light  me-2"><i className="fas fa-pen user-icon" /> Edit Profile</button> */}
        {/* <button className="btn btn-light"><i className="fas fa-ellipsis user-icon" /></button> */}
      </div>
    </div>
  </div>
  {/* Main Content */}
  <div className="row mt-2">
    {/* Left Sidebar */}
    <div className="col-md-5 col-lg-4 ">
      {/* Intro Box */}
      <div className="bg-white p-3 rounded mb-3 shadow-sm user-info">
        <h3 className="fw-bold second-color">Info</h3>
        <p className="text-center mt-3 mb-3">
          <i className="fas fa-briefcase me-2 user-icon" /> Works as <strong>{userProfile?.title}</strong>
        </p>
        <p className="text-center mb-3">
          <i className="fa-solid fa-phone me-2 user-icon" /> {userProfile?.phone}
        </p>
        <p className="text-center mb-3">
          <i className="fa-solid fa-envelope me-2 user-icon" />
          {userProfile?.email}
        </p>
        <p className="text-center mb-3">
          <i className="fas fa-solid fa-calendar-days user-icon" /> Join at <strong>2025-4-24</strong>
        </p>
        {/* <button className="btn btn-light w-100">Edit Details</button> */}
      </div>




    </div>
    {/* Right Content - Posts */}
    <div className="col-md-7 col-lg-8">
      {/* Create Post */}
      {id===authUser?._id ? <CreatePostSection /> : ""}
      {/* Posts */}
      <PostsList posts={[...userPosts].reverse()} />
    </div>
  </div>
</div>

  </div>
 


    </>
  )
}

export default CommunityUserProfile