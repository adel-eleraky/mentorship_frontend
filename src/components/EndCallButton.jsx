import React from "react";
import { useCall } from "@stream-io/video-react-sdk";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { hexToRgb } from "@mui/material";
import { height } from "@mui/system";

const EndCallButton = ({ refreshRecordings }) => {
  const call = useCall();
  const navigate = useNavigate();

  const handleEndCall = async () => {
    if (call) {
      try {
        // If refreshRecordings function is provided, call it to save recordings
        if (refreshRecordings) {
          await refreshRecordings();
        }
        // Then leave the call
        await call.leave();
        navigate("/mentor");
      } catch (error) {
        console.error("Error ending call:", error);
        navigate("/mentor");
      }
    }
  };

  return (
    <Button
      className="btn btn-danger rounded-2xl px-3 "
      style={{ height: "0.9rem" }}
      onClick={handleEndCall}
    >
      End Call
    </Button>
  );
};

export default EndCallButton;
