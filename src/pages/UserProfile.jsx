import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import "./css/UserProfile.css"

function UserProfile() {
  return (
    <div className='user_profile_page'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" , color: "black"}}>
          <Toolbar >
            <Typography variant="h6" component="div" sx={{ "&:hover": { borderBottom: "1px solid red"}}}>
              <Link to="profile">Profile</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default UserProfile
