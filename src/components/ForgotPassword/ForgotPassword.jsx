import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, CircularProgress } from "@mui/material";

export default function ForgotPassword() {
  const [apiMessage, setApiMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        setApiMessage(null);
        setIsLoading(true);
        setIsDisabled(true);
        setCountdown(30);

        const response = await axios.post("http://localhost:3000/api/v1/auth/forgot-password", {
          email: values.email,
        });

        if (response.status === 200) {
          setApiMessage("✅ Password reset link sent! Check your email.");
        }
      } catch (error) {
        setApiMessage(error.response?.data?.message || "Something went wrong.");
      } finally {
        setIsLoading(false);

        let seconds = 30;
        const timer = setInterval(() => {
          seconds -= 1;
          setCountdown(seconds);
          if (seconds <= 0) {
            clearInterval(timer);
            setIsDisabled(false);
          }
        }, 1000);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body1" align="center">
          Enter your email to receive a reset link.
        </Typography>

        {apiMessage && <Typography variant="body2" color="success.main" align="center" mt={2}>{apiMessage}</Typography>}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            disabled={isLoading || isDisabled}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : isDisabled ? `Try again in ${countdown}s` : "Send Reset Link"}
          </Button>

          {/* {isDisabled && <Typography color="error" align="center" sx={{ mt: 2 }}>You can request a new link in {countdown} seconds.</Typography>} */}

          <Typography align="center" sx={{ mt: 2 }}>
            Remembered your password?{" "}
            <Button variant="text" color="success" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </form>
      </Box>
      <br />
    </Container>
    
  );
}
