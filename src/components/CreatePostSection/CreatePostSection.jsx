import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../rtk/features/postSlice'
import { toast } from 'react-toastify'

export default function CreatePostSection() {
    const [content, setContent] = useState("")
    const [modalContent, setModalContent] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
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

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.onload = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleModalPost = () => {
        // Here you would typically handle the post with image
        // For now, we'll just close the modal and show a success message
        
        // Close the modal
        document.getElementById("closeModalBtn").click()
        
        // Reset form
        setModalContent("")
        setSelectedImage(null)
        setImagePreview(null)
        
        toast.success("Post with image created successfully", {
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
        <>
            <div className="bg-white p-3 rounded mb-3 shadow-sm">
                <div className="d-flex">
                    <img
                        src={`http://localhost:3000/img/users/${user?.image}`}
                        className="rounded-circle me-2"
                        alt="Profile"
                        style={{ width: "45px" }}
                    />
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            className="form-control rounded-pill bg-light" 
                            placeholder="What's on your mind, John?" 
                        />
                        <button 
                            className='btn text-white rounded' 
                            onClick={handleCreatePost} 
                            style={{ backgroundColor: "#118577" }}
                        > 
                            Post 
                        </button>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <button 
                        className="btn btn-light flex-grow-1 me-1" 
                        data-bs-toggle="modal" 
                        data-bs-target="#photoModal"
                    >
                        <i className="fas fa-images user-icon" /> Photo
                    </button>
                    {/* <button className="btn btn-light flex-grow-1"><i className="far fa-smile text-warning" /> Feeling</button> */}
                </div>
            </div>

            {/* Photo Modal */}
            <div className="modal fade" id="photoModal" tabIndex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="photoModalLabel">Create Post with Photo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 d-flex">
                                <img
                                    src={`http://localhost:3000/img/users/${user?.image}`}
                                    className="rounded-circle me-2"
                                    alt="Profile"
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <div>
                                    <h6 className="mb-0">{user?.name || "John Doe"}</h6>
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea 
                                    className="form-control border-0" 
                                    placeholder="What's on your mind?" 
                                    rows="3"
                                    value={modalContent}
                                    onChange={(e) => setModalContent(e.target.value)}
                                ></textarea>
                            </div>

                            {imagePreview && (
                                <div className="mb-3 text-center position-relative">
                                    <img 
                                        src={imagePreview} 
                                        alt="Selected" 
                                        className="img-fluid" 
                                        style={{ maxHeight: "300px" }} 
                                    />
                                    <button 
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                        onClick={() => {
                                            setSelectedImage(null)
                                            setImagePreview(null)
                                        }}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            )}

                            <div className="d-flex align-items-center p-2 rounded border">
                                <div className="flex-grow-1">Add to your post</div>
                                <div>
                                    <label htmlFor="imageUpload" className="btn btn-light btn-sm rounded-circle me-1" style={{ cursor: "pointer" }}>
                                        <i className="fas fa-images text-success"></i>
                                    </label>
                                    <input 
                                        type="file" 
                                        id="imageUpload" 
                                        accept="image/*" 
                                        className="d-none"
                                        onChange={handleImageChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button 
                                type="button" 
                                className="btn text-white" 
                                style={{ backgroundColor: "#118577" }}
                                onClick={handleModalPost}
                                disabled={!modalContent && !selectedImage}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}