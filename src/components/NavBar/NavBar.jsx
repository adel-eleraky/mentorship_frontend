import React from 'react'
import { NavLink } from 'react-router-dom'
function NavBar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand"  to={'/home'}>MentorShip</NavLink>
        <button className="navbar-toggler" type="button" >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
                <NavLink className="nav-link active" to={'/home'} >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to={'/chat'} >chats</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to={'/mentorprofile'} >Mentor Profile </NavLink>
              </li>                 
              <li className="nav-item">
              <NavLink className="nav-link"  to={'/home'}>Loge Out</NavLink>
              </li>
              {/* <li className="nav-item">
              <NavLink className="nav-link" to={'/register'}>Register</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to={'/login'}>login</NavLink>
             </li> */}
          </ul>
        </div>
      </div>
    </nav>
</>
  )
}

export default NavBar