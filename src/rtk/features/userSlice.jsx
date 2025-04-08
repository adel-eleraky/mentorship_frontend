import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const updateUserProfile = createAsyncThunk("user/updateUser", async (updatedData, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`http://localhost:3000/api/v1/users`, updatedData, { withCredentials: true });
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})


export const getUserSessions = createAsyncThunk("user/getSessions", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/users/sessions`, { withCredentials: true });
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})


export const getUser = createAsyncThunk("user/getUser", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/users/${id}`, { withCredentials: true });
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})


export const uploadImage = createAsyncThunk("user/uploadImage", async (values, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("image", values.image);

        const { data } = await axios.put(`http://localhost:3000/api/v1/users/upload`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})

const initialState = {
    loading: false,
    status: "",
    updateMessage: "",
    user: "",
    sessions: [],
    errors: null,
    imageLoading: false,
    imageMessage: "",
    updateLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state, action) => {
                state.updateLoading = true
                state.errors = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.updateLoading = false
                state.status = action.payload.status
                state.updateMessage = action.payload.message
                state.user = action.payload.data
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.updateLoading = false
                state.status = action.payload.status
                state.updateMessage = action.payload.message
                state.errors = action.payload.errors
            })
            .addCase(getUserSessions.pending, (state, action) => {
                state.errors = null
            })
            .addCase(getUserSessions.fulfilled, (state, action) => {
                state.status = action.payload.status
                // state.message = action.payload.message
                state.sessions = action.payload.data
            })
            .addCase(getUserSessions.rejected, (state, action) => {
                state.status = action.payload.status
                // state.message = action.payload.message
                state.errors = action.payload.errors
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload.data
            })
            .addCase(uploadImage.pending, (state, action) => {
                state.imageLoading = true
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.imageLoading = false
                state.user = action.payload.data
                state.imageMessage = action.payload.message
            })
            
    }
})


export default userSlice.reducer
