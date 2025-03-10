import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/RoomSlice";
import userReducer from "./features/userSlice";


const Store = configureStore({
    reducer: {
        room: roomReducer,
        user: userReducer
    }
})

export default Store