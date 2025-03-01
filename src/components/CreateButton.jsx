import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function CreateButton() {
  const socket = io("http://localhost:3000");
  const navigate = useNavigate();

  const enterMeeting = ({ meetingId }) => {
    console.log({ meetingId });
    navigate(`/meeting/${meetingId}`);
  };
  useEffect(() => {
    socket.on("meetingCreated", enterMeeting);
    return () => socket.off("meetingCreated", enterMeeting);
  }, []);
  const creatMeeting = () => {
    socket.emit("createMeeting");
  };
  return <button onClick={creatMeeting}>start new meeting</button>;
}

export default CreateButton;
