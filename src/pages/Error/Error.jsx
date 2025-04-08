import React from 'react'
import './Error.css'
import {  NavLink  } from "react-router-dom";
function Error() {
  return (
    <>
<div className="error-container">
  <div className="error-content">
    
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Open_book_nae_02.svg/1200px-Open_book_nae_02.svg.png" alt="Mike Wazowski Character" className="error-image" />

    <div className="error-text">

      <h1 className="error-heading second-color "> <span className='error-404'>404</span> PAGE NOT FOUND.</h1>
      <p className="error-message">You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.</p>
                <NavLink className="btn home-button frist-color" to={"/"}>
                BACK TO HOME
                </NavLink>
         
    </div>
  </div>
</div>

    
    
    </>
  )
}

export default Error