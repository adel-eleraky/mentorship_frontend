import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chatSlice";
import userReducer from "./features/userSlice";
import mentorReducer from "./features/mentorSlice"; 
import authReducer from "./features/authSlice";
import postReducer from "./features/postSlice";
import notificationReducer from "./features/notificationSlice";


const Store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
        auth: authReducer,
        mentor: mentorReducer,
        post: postReducer,
        notification: notificationReducer
    },
});

export default Store;
