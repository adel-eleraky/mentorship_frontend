import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./features/RoomSlice";


const Store = configureStore({
    reducer: {
        room: roomSlice
    }
})

export default Store