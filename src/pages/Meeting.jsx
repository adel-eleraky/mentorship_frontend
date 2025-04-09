import React, { useEffect, useState } from "react";
import {
  useCallStateHooks,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  CallControls,
  StreamTheme,
  SpeakerLayout,
  PaginatedGridLayout,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import MeetingSetup from "../components/MeetingSetup";
import MeetingRoom from "../components/MeetingRoom";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUser } from "../rtk/features/authSlice";
import Loader from "./../components/Loader/Loader";

export const Meeting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { user: mentor, loading: mentorLoading } = useSelector(
    (state) => state.auth
  );
  const [recordings, setRecordings] = useState([]);

  // First, fetch the mentor data
  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  // Stream credentials
  const apiKey = "5tbes3fua53a";

  // Then, initialize the call AFTER mentor data is available
  useEffect(() => {
    // Skip if mentor data is still loading
    if (mentorLoading) return;

    const initializeCall = async () => {
      try {
        console.log("Initializing call with mentor data:", mentor);

        // Generate user ID - either from mentor or random
        const userId =
          (mentor && mentor._id) ||
          localStorage.getItem("streamVideoUserId") ||
          `user-${Math.random().toString(36).substring(2, 15)}`;

        // Save to localStorage if needed
        if (!localStorage.getItem("streamVideoUserId")) {
          localStorage.setItem("streamVideoUserId", userId);
        }

        // Create user object
        const user = mentor
          ? { id: userId, name: mentor.name || "User" }
          : { id: userId, name: "Guest User" };

        const { data } = await axios.get(
          `http://localhost:3000/api/v1/sessions/getVideoToken?userId=${userId}&timestamp=${Date.now()}`
        );

        const token = data.token;
        // Create a new client instance
        const videoClient = new StreamVideoClient({
          apiKey,
          user,
          token,
        });

        const callInstance = videoClient.call("default", id);

        // First check if the call exists before trying to create it
        try {
          // Try to get call status first
          const callState = await callInstance.getOrCreate();
        } catch (callError) {
          // If error is because call doesn't exist, create it
          if (callError.message.includes("not found")) {
            await callInstance.join({ create: true });
          } else {
            // Some other error occurred
            throw callError;
          }
        }

        setClient(videoClient);
        setCall(callInstance);
        setLoading(false);
      } catch (err) {
        console.error("Error in video call:", err);
        setError("Error in video call: " + err.message);
        setLoading(false);
      }
    };

    initializeCall();

    return () => {
      // When component unmounts, fetch recordings before leaving
      const saveRecordingsBeforeLeave = async () => {
        try {
          if (call) {
            // Fetch recordings one last time before leaving
            await fetchRecordings();
            // Then leave the call
            await call.leave();
          }
          if (client) {
            await client.disconnectUser();
          }
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      };

      saveRecordingsBeforeLeave();
    };
  }, [id, mentor, mentorLoading]); // Add mentor and mentorLoading to dependencies

  // Function to fetch recordings for this call
  const fetchRecordings = async () => {
    try {
      if (!call) return;

      // Get recordings for this call
      const callRecordings = await call.queryRecordings();
      setRecordings(callRecordings);
      console.log("Available recordings:", callRecordings);

      // If we have recordings, save them to the session in the database
      if (
        callRecordings &&
        callRecordings.recordings &&
        callRecordings.recordings.length > 0
      ) {
        try {
          console.log(id);

          // Update the session with the recording URLs
          const response = await axios.put(
            `http://localhost:3000/api/v1/mentors/sessions/${id}`,
            { recordings: callRecordings.recordings },
            { withCredentials: true }
          );

          console.log("Session updated with recordings:", response.data);
        } catch (updateError) {
          console.error("Error updating session with recordings:", updateError);
        }
      }
    } catch (err) {
      console.error("Error fetching recordings:", err);
    }
  };

  // Fetch recordings when call is initialized
  useEffect(() => {
    if (call) {
      fetchRecordings();
    }
  }, [call]);

  if (loading) return <Loader />;
  if (error) return <div className="error-container">{error}</div>;
  if (!client || !call)
    return (
      <div className="error-container">Failed to initialize video call</div>
    );

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme as="main" className="video-call-container">
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom
              recordings={recordings}
              refreshRecordings={fetchRecordings}
            />
          )}
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default Meeting;
