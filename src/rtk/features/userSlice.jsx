import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const updateUserProfile = createAsyncThunk("user/updateUser", async (updatedData, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`http://localhost:3000/api/v1/users`, updatedData , { withCredentials: true });
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})


export const getUserSessions = createAsyncThunk("user/getSessions", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/users/sessions`, { withCredentials: true});
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
    errors: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state, action) => {
                state.loading = true
                state.errors = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.status = action.payload.status
                state.updateMessage = action.payload.message
                state.user = action.payload.user
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false
                state.status = action.payload.status
                state.updateMessage = action.payload.message
                state.errors = action.payload.errors
            })
            .addCase(getUserSessions.pending , (state, action ) => {
                state.errors = null
            })
            .addCase(getUserSessions.fulfilled , (state, action ) => {
                state.status = action.payload.status
                // state.message = action.payload.message
                state.sessions = action.payload.data
            })
            .addCase(getUserSessions.rejected , (state, action ) => {
                state.status = action.payload.status
                // state.message = action.payload.message
                state.errors = action.payload.errors
            })
    }
})


export default userSlice.reducer
