import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { useParams } from 'react-router'
import axios from 'axios'
function CommunityUserProfile() {

  const { id } = useParams()
  const [posts , setPosts] = useState([])

  console.log(posts)

  const fetchUserPosts = async () => {
    const res = await axios.get(`http://localhost:3000/api/v1/users/${id}/posts`)
    return res.data
  }

  useEffect(() => {

    fetchUserPosts().then((data) => {
      setPosts(data.data)
    })
  }, [id])

  return (
    <>
 <div className=" user-pro ">
  <div className="cover-photo">
    <div className='container'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" className="user-profile-picture" alt="Profile Picture" />


    </div>
  </div>
  {/* Profile Info */}
  <div className='container'>
  <div className="profile-info ">
    <div className="d-flex justify-content-between align-items-end">
      <div>
        <h1 className="fw-bold mb-0 second-color">John Doe</h1>
        <h5>Software Engineer</h5>
        <div>
          <span className="text-muted mb-0">123 Following : </span>
          <span className="text-muted mb-0"> 1500 Followers </span>
        </div>
      </div>
      <div>
        <button className="btn  user-follow me-2"><i className="fas fa-plus" /> Follow</button>
        <button className="btn btn-light  me-2"><i className="fas fa-pen user-icon" /> Edit Profile</button>
        <button className="btn btn-light"><i className="fas fa-ellipsis user-icon" /></button>
      </div>
    </div>
  </div>
  {/* Main Content */}
  <div className="row mt-2">
    {/* Left Sidebar */}
    <div className="col-md-5 col-lg-4 ">
      {/* Intro Box */}
      <div className="bg-white p-3 rounded mb-3 shadow-sm user-info">
        <h3 className="fw-bold">Info</h3>
        <p className="text-center mt-3 mb-3">
          <i className="fas fa-briefcase me-2 user-icon" /> Works as <strong>Software Engineer</strong>
        </p>
        <p className="text-center mb-3">
          <i className="fas fa-home me-2 user-icon" /> Lives in <strong>New York</strong>
        </p>
        <p className="text-center mb-3">
          <i className="fa-solid fa-phone me-2 user-icon" /> 0123-456-789
        </p>
        <p className="text-center mb-3">
          <i className="fa-solid fa-envelope me-2 user-icon" />
          robert.johnson@example.com
        </p>
        <p className="text-center mb-3">
          <i className="fas fa-solid fa-calendar-days user-icon" /> Join at <strong>2025-4-24</strong>
        </p>
        <button className="btn btn-light w-100">Edit Details</button>
      </div>
      {/* profiles Box */}
      <div className="bg-white p-3 rounded mb-3 shadow-sm container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">More profiles for you</h4>
          <a href="#" className="user-icon">See All profiles</a>
        </div>
        <div className="row g-2">
          <div className="col-4">
            <img src="/api/placeholder/100/100" className="img-fluid rounded" alt="Photo" />
          </div>
          <div className="col-4">
            <img src="/api/placeholder/100/100" className="img-fluid rounded" alt="Photo" />
          </div>
          <div className="col-4">
            <img src="/api/placeholder/100/100" className="img-fluid rounded" alt="Photo" />
          </div>
          <div className="col-4">
            <img src="/api/placeholder/100/100" className="img-fluid rounded" alt="Photo" />
          </div>
          <div className="col-4">
            <img src="/api/placeholder/100/100" className="img-fluid rounded" alt="Photo" />
          </div>
          <div className="col-4">
            <img src="/api/placeholder/100/100" className="img-fluid rounded" alt="Photo" />
          </div>
        </div>
      </div>            
    </div>
    {/* Right Content - Posts */}
    <div className="col-md-7 col-lg-8">
      {/* Create Post */}
      <div className="bg-white p-3 rounded mb-3 shadow-sm">
        <div className="d-flex">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" className="rounded-circle me-2" alt="Profile" />
          <div className="input-group">
            <input type="text" className="form-control rounded-pill bg-light" placeholder="What's on your mind, John?" />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <button className="btn btn-light flex-grow-1 me-1"><i className="fas fa-images user-icon" /> Photo</button>
          <button className="btn btn-light flex-grow-1"><i className="far fa-smile second-color" /> Feeling</button>
        </div>
      </div>



      {/* Post 1 */}
      {posts.map((post)=>( 
          <div key={post.id} className="post-card bg-white ">
          <div className="p-3">
            <div className="d-flex align-items-center mb-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" className="rounded-circle me-2" alt="Profile" />
              <div>
                <h6 className="mb-0 fw-bold">John Doe</h6>
                <small className="text-muted">{post.createdAt} <i className="fas fa-globe-americas" /></small>
              </div>
              <div className="ms-auto">
                <button className="btn btn-light btn-sm"><i className="fas fa-ellipsis user-icon" /></button>
              </div>
            </div>
            <p>{post.content}</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                {/* <span><i className="fas fa-thumbs-up user-icon" />{ post.reactions.likes} 500k</span> */}
              </div>
              <div>
                <span>45 comments · 12 shares</span>
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




      ))}
    
    </div>
  </div>
</div>

  </div>
 


    </>
  )
}

export default CommunityUserProfile