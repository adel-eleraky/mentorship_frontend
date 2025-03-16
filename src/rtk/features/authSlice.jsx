import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "http://localhost:3000/api/v1";


// Async thunk for user login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials, {
                withCredentials: true
            });
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data || "Login failed");
        }
    }
);


//Async thunk to register user
export const registerUser = createAsyncThunk("auth/register", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, credentials, { withCredentials: true });
        return response.data;
    } catch (err) {

        return rejectWithValue(err.response?.data);
    }
})

// export const verifyUser = createAsyncThunk("auth/verify", async (credentials, { rejectWithValue }) => {
//     try {
//         const response = await axios.put(`${API_URL}/users/verify`, credentials, { withCredentials: true });
//         return response.data;
//     } catch (err) {

//         return rejectWithValue(err.response?.data);
//     }
// })


// Create auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "",
        message: "",
        user: null,
        loading: false,
        token: "",
        errors: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.status = action.payload.status
                state.message = action.payload.message
                state.user = action.payload.data;
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.status = action.payload.status
                state.message = action.payload.message
                state.errors = action.payload.errors;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true
                state.errors = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = action.payload.status
                state.user = action.payload.data
                state.message = action.payload.message
                state.token = state.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.status = action.payload.status
                state.errors = action.payload.errors
                state.message = action.payload.message
            })
    },
});

// Export actions & reducer
export default authSlice.reducer;
