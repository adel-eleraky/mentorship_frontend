import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../rtk/features/authSlice";
import { Link, useParams } from "react-router";
import { CircularProgress, Typography, Box } from "@mui/material";

function Verify() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { token } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyUser(token));
    setIsLoading(false);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // height="100vh"
      fontFamily="Arial, sans-serif"
    >
      {isLoading ? (
        <>
          <CircularProgress color="primary" />
          <Typography variant="h6" color="primary" marginLeft={2}>
            Verifying your account, please wait...
          </Typography>
        </>
      ) : (
        // <Typography variant="h6" color="success.main">
        //     Verification complete!
        // </Typography>
        <div className="d-flex justify-content-center align-content-center my-5 ">
          <div
            className="p-5 shadow-lg rounded"
            style={{ width: "fit-content" }}
          >
            <h4>Verified Email successfully</h4>
            <i
              className="fa-solid fa-circle-check d-block mx-auto fs-1 my-3"
              style={{ color: "#2be34a", width: "fit-content" }}
            ></i>
            <Link
              to={`/${user?.role}`}
              className="btn btn-primary d-block mx-auto"
            >
              {" "}
              Go to Dashboard{" "}
            </Link>
          </div>
        </div>
      )}
    </Box>
  );
}

export default Verify;
