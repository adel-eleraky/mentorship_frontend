import React,{ useEffect, useState } from 'react'
import axios from "axios";
import './MentorInfo.css'
function MentorInfo({mentor}) {



  return (
    <>

<div class="container ">
<div class="mentor-cover-photo">
    <img
      src={`http://localhost:3000/img/users/${mentor?.image}`}
    alt="..."
      width={230}
      className="rounded   mentor-profile-picture"
    />

</div>
{/* <!-- Profile Content --> */}
    <div class="container py-4 ">
        <div class="row">
            {/* <!-- Left Column: Profile Information --> */}
            <div class="col-md-5">
                <h1 className=" second-color">{mentor?.name}</h1>
                <p class="">{mentor?.title} </p>
                <p class=" frist-color"><strong className="second-color">Experience:</strong>  {mentor?.experience}</p>
                
                <div class="mt-4">
                    <div class="mentor-info-line mentor-rating">
                            <i class="fa-solid fa-at mentor-info-icon frist-color "></i>
                         <span> {mentor?.email}</span>
                    </div>
                 
                    
                    <div class="mentor-info-line mentor-rating">
                        <i class="fas fa-star mentor-info-icon frist-color  "></i>
                         <span> 5.0 (25 reviews)</span>
                    </div>
                    
                    <div class="mentor-info-line">
                        <i class="fas fa-clock mentor-info-icon frist-color "></i>
                        <span>{mentor?.status} this week</span>
                    </div>
                    
                    <div class="mentor-info-line">
                        <i class="fas fa-comment mentor-info-icon"></i>
                        <span>Usually responds <a href="#" class="text-dark">in a day or two</a></span>
                    </div>
                </div>
                
              
            </div>
            
            {/* <!-- Right Column: Skills --> */}
            <div class="col-md-7">
                <div class="skills-section">
                    <h4 className="second-color">Skills </h4>
                    <div class="mt-3">
                        <span class="mentor-skill-badge list-skills">Machine Learning</span>
                        <span class="mentor-skill-badge list-skills">Data Science</span>
                        <span class="mentor-skill-badge list-skills">Product Market Fit</span>
                        <span class="mentor-skill-badge list-skills">PhD Supervision</span>
                        <span class="mentor-skill-badge list-skills">Deep Learning</span>
                        <span class="more-skills">+  more</span>
                    </div>
                </div>
            </div>
        </div>
</div>
</div>

 


  {/* =========================== About ============================ */}
  <div className="container py-1 mb-4 mt-2">
        <h3 className="mx-3 second-color">About :</h3>
        <div className="p-4 ">
          <p className="font-italic mb-0">{mentor?.bio}</p>
        </div>
      </div>
    
    
    </>
  )
}

export default MentorInfo