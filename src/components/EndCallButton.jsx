import React from "react";
import { useCall } from "@stream-io/video-react-sdk";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { hexToRgb } from "@mui/material";
import { height } from "@mui/system";

const EndCallButton = () => {
  const call = useCall();
  const navigate = useNavigate();

  const handleEndCall = async () => {
    if (call) {
      await call.leave();
      navigate("/mentor");
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
