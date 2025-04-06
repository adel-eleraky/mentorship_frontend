import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/RoomSlice";
import userReducer from "./features/userSlice";
import mentorReducer from "./features/mentorSlice"; 
import authReducer from "./features/authSlice";
import postReducer from "./features/postSlice";


const Store = configureStore({
    reducer: {
        room: roomReducer,
        user: userReducer,
        auth: authReducer,
        mentor: mentorReducer,
        post: postReducer
    },
});

export default Store;
