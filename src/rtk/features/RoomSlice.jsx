import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getRoomMessages = createAsyncThunk("room/getMessages", async (room, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/rooms/${room}/messages`);
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})

const initialState = {
    status: "",
    message: "",
    data: "",
    roomMessages: [],
    errors: ""
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            console.log(action)
            state.roomMessages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomMessages.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
            state.roomMessages = action.payload.data
        })
    }
})


export default roomSlice.reducer
export const { addMessage } = roomSlice.actions