import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMentors = createAsyncThunk(
  "mentors/fetchMentors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/mentors`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch mentors");
    }
  }
);

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
export const fetchMentorData = createAsyncThunk(
  "mentor/getMentor",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/mentors/67d5eb638678c21491e11a92"
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
  mentor: null,
  mentors: [],
  sessions: [],
  errors: null,
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
          state.loading = false;
          state.mentors = action.payload;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
          state.loading = false;
          state.errors = action.payload.errors;
      })
      .addCase(updateMentorProfile.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(updateMentorProfile.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.mentor = action.payload.mentor;
        state.loading = false;
      })
      .addCase(updateMentorProfile.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
        state.loading = false;
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
      })
      .addCase(fetchMentorData.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchMentorData.fulfilled, (state, action) => {
        state.loading = false;
        state.mentor = action.payload;
      })
      .addCase(fetchMentorData.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default mentorSlice.reducer;
