import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllPosts = createAsyncThunk("post/getAllPosts" , async (_ , { rejectWithValue}  ) => {
    try {
        const {data} = await axios.get("http://localhost:3000/api/v1/posts", { withCredentials: true})
        return data
    }catch (err) {
        return rejectWithValue(err.response.data)
    }
})


export const getUserPosts = createAsyncThunk("post/getUserPosts" , async (id , { rejectWithValue}  ) => {
    try {
        const {data} = await axios.get(`http://localhost:3000/api/v1/users/${id}/posts`, { withCredentials: true})
        return data
    }catch (err) {
        return rejectWithValue(err.response.data)
    }
})


export const createPost = createAsyncThunk("post/createPost" , async (post , { rejectWithValue}  ) => {
    try {
        const {data} = await axios.post("http://localhost:3000/api/v1/posts", {content: post} , { withCredentials: true})
        return data
    }catch (err) {
        return rejectWithValue(err.response.data)
    }
})


const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        userPosts: [],
        status: "",
        message: "",
        loading: false,
        errors: ""
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.fulfilled , (state, action) => {
            state.posts = action.payload.data
            state.status = action.payload.status
        })
        .addCase(getUserPosts.fulfilled , (state , action) => {
            state.userPosts = action.payload.data
            state.status = action.payload.status
        })
        .addCase(createPost.pending , (state , action) => {
            state.loading = true
        })
        .addCase(createPost.fulfilled , (state , action) => {
            state.status = action.payload.status
            state.message = action.payload.message
            state.loading = false
        })
    }
})

export default postSlice.reducer