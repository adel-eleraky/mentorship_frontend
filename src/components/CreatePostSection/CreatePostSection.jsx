import React from 'react'

export default function CreatePostSection() {
    return (
        <div className="bg-white p-3 rounded mb-3 shadow-sm">
            <div className="d-flex">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" 
                    className="rounded-circle me-2" 
                    alt="Profile" 
                    style={{ width: "45px" }}
                />
                <div className="input-group">
                    <input type="text" className="form-control rounded-pill bg-light" placeholder="What's on your mind, John?" />
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <button className="btn btn-light flex-grow-1 me-1"><i className="fas fa-images user-icon" /> Photo</button>
                <button className="btn btn-light flex-grow-1"><i className="far fa-smile text-warning" /> Feeling</button>
            </div>
        </div>
    )
}
