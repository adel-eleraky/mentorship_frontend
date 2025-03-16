import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { Button } from "../components/ui/button";

const MeetingSetup = ({ setIsSetupComplete }) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const call = useCall();

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call?.microphone]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 ">
      <h1 className="text-center mb-3">Setup</h1>
      <VideoPreview className="w-50 max-w-100 mb-3" />
      <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
        <label className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            className="text-dark"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        {call && <DeviceSettings key={call?.id} />}
      </div>
      <Button
        className="btn btn-success"
        onClick={() => {
          call?.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
