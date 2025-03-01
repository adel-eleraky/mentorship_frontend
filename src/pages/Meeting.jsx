import { useParams } from "react-router-dom";

function Meeting() {
  const { id } = useParams();
  return (
    <>
      <h4>meeting id :{id}</h4>
    </>
  );
}

export default Meeting;
