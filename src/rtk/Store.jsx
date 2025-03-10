import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/RoomSlice";
import userReducer from "./features/userSlice";
import mentorReducer from "./features/mentorSlice";

const Store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
    mentor: mentorReducer,
  },
});

export default Store;
