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

export const Meeting = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Stream credentials
  const apiKey = "5tbes3fua53a";
  // Generate a unique user ID for each browser session
  const userId =
    localStorage.getItem("streamVideoUserId") ||
    `user-${Math.random().toString(36).substring(2, 15)}`;

  // Save the user ID to localStorage to keep it consistent
  useEffect(() => {
    if (!localStorage.getItem("streamVideoUserId")) {
      localStorage.setItem("streamVideoUserId", userId);
    }
  }, [userId]);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const user = { id: userId, name: "ahmed" };
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/sessions/getVideoToken?userId=${userId}`
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
      if (call) {
        call.leave().catch(console.error);
      }
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [id, userId]);

  if (loading) return <div className="loading">Loading video call...</div>;
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
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default Meeting;
