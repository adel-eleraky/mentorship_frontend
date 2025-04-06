import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../rtk/features/postSlice'
import { toast } from 'react-toastify'

export default function CreatePostSection() {

    const [content, setContent] = useState("")
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleCreatePost = () => {
        dispatch(createPost(content))
        setContent("")
        toast.success("Post created successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    return (
        <div className="bg-white p-3 rounded mb-3 shadow-sm">
            <div className="d-flex">
                <img
                    src={`http://localhost:3000/img/users/${user?.image}`}
                    className="rounded-circle me-2"
                    alt="Profile"
                    style={{ width: "45px" }}
                />
                <div className="input-group">
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="form-control rounded-pill bg-light" placeholder="What's on your mind, John?" />
                    <button className='btn text-white rounded' onClick={handleCreatePost} style={{ backgroundColor: "#118577 " }}> Post </button>
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
