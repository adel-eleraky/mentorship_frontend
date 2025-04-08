import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserNotifications = createAsyncThunk("notifications/user", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:3000/api/v1/notifications", { withCredentials: true })
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})



export const markNotificationRead = createAsyncThunk("notifications/markRead", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`http://localhost:3000/api/v1/notifications/`, {id}, { withCredentials: true })
        console.log("data" , data)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})




const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        loading: false,
        loadingMark: false,
        message: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserNotifications.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUserNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload.data
                state.loading = false
            })
            .addCase(markNotificationRead.pending, (state, action) => {
                state.loadingMark = true
            })
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                state.loadingMark = false
                state.message = action.payload.message
            })
    }
})

export default notificationSlice.reducer