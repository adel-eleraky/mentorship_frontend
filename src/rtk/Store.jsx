import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/RoomSlice";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";


const Store = configureStore({
    reducer: {
        room: roomReducer,
        user: userReducer,
        auth: authReducer
    }
})

export default Store