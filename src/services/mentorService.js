import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

export const fetchMentorData = async () => {
  try {
  } catch (error) {
    console.error("Error fetching mentor data:", error);
    throw error;
  }
};

// Fetch sessions from the API
export const fetchMentorSessions = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/mentors/sessions",
      { withCredentials: true }
    );

    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching mentor sessions:", error);
    throw error; // Throw the error so it can be handled by the component
  }
};
export const deleteMentorSessions = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/mentors/sessions/${id}`,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    console.error("Error deleting mentor sessions:", error);
    throw error; // Throw the error so it can be handled by the component
  }
};

export const createMeeting = async (meetingData) => {};

export const createInstantMeeting = async () => {};

export const updateMentorProfile = async (profileData) => {};
