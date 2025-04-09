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


export const getRooms = createAsyncThunk("room/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/v1/rooms');
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})


export const getUserRooms = createAsyncThunk("room/fetchUserRooms", async ({id , role}, { rejectWithValue }) => {
    try {

        role = role.toLowerCase() + "s"
        const { data } = await axios.get(`http://localhost:3000/api/v1/${role}/${id}/rooms`, { withCredentials: true});
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})


export const getPrivateContacts = createAsyncThunk("chat/privateContacts", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/messages/privateContacts`, { withCredentials: true});
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})

const initialState = {
    status: "",
    message: "",
    data: "",
    rooms: [],
    roomMessages: [],
    errors: "",
    userRooms: [],
    privateContacts: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addRoomMessage: (state, action) => {
            console.log(action)
            state.roomMessages.push(action.payload)
        },
        addPrivateMessage: (state, action)=> {
            state.privateContacts.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomMessages.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.roomMessages = action.payload.data
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.rooms = action.payload.data
            })
            .addCase(getUserRooms.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.userRooms = action.payload.data
            })
            .addCase(getPrivateContacts.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.privateContacts = action.payload.data
            })

            
    }
})


export default chatSlice.reducer
export const { addRoomMessage, addPrivateMessage } = chatSlice.actions