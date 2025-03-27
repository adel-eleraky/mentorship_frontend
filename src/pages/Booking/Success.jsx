import React from 'react'
import { Link } from 'react-router'

function Success() {
    return (
        <div className='d-flex justify-content-center align-content-center my-5 ' >
            <div className='p-5 shadow-lg rounded' style={{ width: "fit-content" }}>
                <h4>
                    booking created successfully
                </h4>
                <i className="fa-solid fa-circle-check d-block mx-auto fs-1 my-3" style={{ color: "#2be34a" , width: "fit-content"}}></i>
                <Link to="/user" className='btn btn-primary d-block mx-auto'> Go to Dashboard </Link>
            </div>
        </div>
    )
}

export default Success
