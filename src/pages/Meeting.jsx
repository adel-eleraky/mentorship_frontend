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
  const userId = "67d5eb638678c21491e11a92";
  // Use a pre-generated token from your backend

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const user = { id: userId, name: "adel" };
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

        // await callInstance.join({ create: true });

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
  }, [id]);

  if (loading) return <div className="loading">Loading video call...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!client || !call)
    return (
      <div className="error-container">Failed to initialize video call</div>
    );

  return (
    <StreamVideo client={client}>
      <StreamTheme as="main" className="video-call-container">
        <StreamCall call={call}>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};

export default Meeting;
