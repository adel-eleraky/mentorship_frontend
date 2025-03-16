import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateMentorProfile = createAsyncThunk(
  "mentor/updateMentor",
  async (updatedData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/mentors/`,
        updatedData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getMentorSessions = createAsyncThunk(
  "mentor/getSessions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/mentors/sessions`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  loading: false,
  status: "",
  message: "",
  mentor: "",
  sessions: [],
  errors: null,
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateMentorProfile.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(updateMentorProfile.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.mentor = action.payload.mentor;
      })
      .addCase(updateMentorProfile.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      .addCase(getMentorSessions.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getMentorSessions.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.sessions = action.payload.data;
      })
      .addCase(getMentorSessions.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      });
  },
});

export default mentorSlice.reducer;
