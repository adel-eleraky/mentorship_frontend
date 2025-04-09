import React, { useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router";
import { GridOn, ViewAgenda, People } from "@mui/icons-material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import EndCallButton from "./EndCallButton";

const MeetingRoom = ({ recordings, refreshRecordings }) => {
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const navigate = useNavigate();

  // Handle ending the call and saving recordings
  const handleEndCall = async () => {
    try {
      // Refresh recordings one last time before ending
      await refreshRecordings();
      alert("Call ended. Recordings saved.");
      // Navigate away
      navigate("/");
    } catch (error) {
      console.error("Error ending call:", error);
      navigate("/");
    }
  };

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
    <section className="relative overflow-hidden text-white">
      <div className=" flex items-center justify-center h-100 w-100">
        <div className="flex items-center container w-100">
          <CallLayout className=" " />
        </div>
        <div
          className={`position-absolute top-0 end-0 h-100 px-3 ${
            !showParticipants ? "d-none" : ""
          }`}
          style={{ width: "300px", backgroundColor: "#19232d" }}
        >
          <CallParticipantsList
            className=" h-100"
            onClose={() => setShowParticipants(false)}
          />
        </div>
      </div>

      <div className="fixed-bottom d-flex w-100 justify-content-center align-items-center gap-3">
        <CallControls onLeave={handleEndCall} />
        <DropdownMenu>
          <div className="d-flex align-items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-dark px-4 py-2 hover:bg-secondary">
              <ViewAgenda />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase())}
                  className={`hover:bg-secondary ${
                    item.toLowerCase() === layout ? "bg-dark text-white" : ""
                  }`}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className="btn rounded-2xl"
          onClick={() => setShowParticipants((prev) => !prev)}
        >
          <div className="cursor-pointer rounded-2xl bg-dark px-4 py-2 hover:bg-secondary">
            <People className="text-info w-50" />
          </div>
        </button>
        <EndCallButton onClick={handleEndCall} />
      </div>
    </section>
  );
};

export default MeetingRoom;
