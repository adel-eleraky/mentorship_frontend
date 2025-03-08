import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StreamVideo,
  StreamCall,
  StreamVideoClient,
  CallControls,
  SpeakerLayout,
  PaginatedGridLayout,
  DeviceSettings,
  VideoPreview,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// MeetingSetup Component
const MeetingSetup = ({ call, onSetupComplete }) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-dark">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview className="w-100 max-w-screen" />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        {call && <DeviceSettings key={call?.id} />}
      </div>
      <button
        className="btn btn-success"
        onClick={() => {
          call?.join();
          onSetupComplete(true);
        }}
      >
        Join meeting
      </button>
    </div>
  );
};

// MeetingRoom Component
const MeetingRoom = ({ call, onLeave }) => {
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        {showParticipants && (
          <div className="h-[calc(100vh-86px)] ml-2 min-w-[14rem]">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={onLeave} />

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Layout
          </button>
          <ul className="dropdown-menu">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <li key={index}>
                <button
                  className={`dropdown-item ${
                    item.toLowerCase() === layout ? "active" : ""
                  }`}
                  onClick={() => setLayout(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowParticipants((prev) => !prev)}
        >
          {showParticipants ? "Hide Participants" : "Show Participants"}
        </button>
      </div>
    </section>
  );
};

// Main Meeting Component
function Meeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    // Initialize Stream Video client
    const apiKey = import.meta.env.VITE_STREAM_API_KEY;
    // Use a test user ID that matches your token
    const userId = "67cb9013af4f92a5cf56eab2";
    // For testing, use a hardcoded token that's known to work with this user ID
    // This is a temporary solution until your backend token generation is working
    const userToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdjYjkwMTNhZjRmOTJhNWNmNTZlYWIyIn0.SZLqrIlgQQgj7Th4Uq6NJZDQmKnIRhqVC1AJ9cGBgSA";

    const initClient = async () => {
      try {
        setLoading(true);
        console.log("Initializing with:", {
          apiKey,
          userId,
          userToken: userToken.substring(0, 20) + "...",
        });

        // Create a new client instance directly
        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: "Test User",
            image: "https://getstream.io/random_svg/?name=John",
          },
          token: userToken,
          // Add this option to help with debugging
          logLevel: "debug",
        });

        // Connect to Stream
        await videoClient.connectUser();
        setClient(videoClient);

        // Join the call
        const callType = "default";
        const callId = id;

        try {
          // Try to get the call if it exists
          const callInstance = videoClient.call(callType, callId);
          await callInstance.getOrCreate();
          setCall(callInstance);
        } catch (callError) {
          console.error("Error joining call:", callError);
          setError(
            "Failed to join the meeting. The meeting may not exist or you don't have permission to join."
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error initializing video client:", err);
        setError("Failed to initialize video. Please try again later.");
        setLoading(false);
      }
    };

    initClient();

    // Cleanup function remains the same
    return () => {
      if (call) {
        call.leave();
      }
      if (client) {
        client.disconnectUser();
      }
    };
  }, [id]);
  const handleEndCall = () => {
    if (call) {
      call.leave();
    }
    navigate("/mentor");
  };
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Joining meeting...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <button
            className="btn btn-primary"
            onClick={() => navigate("/mentor")}
          >
            Return to Profile
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="meeting-container" style={{ height: "100vh" }}>
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            {!isSetupComplete ? (
              <MeetingSetup call={call} onSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom call={call} onLeave={handleEndCall} />
            )}
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="text-center mt-5">
          <h3>Unable to join meeting</h3>
          <p>There was a problem connecting to the meeting room.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/mentor")}
          >
            Return to Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Meeting;
