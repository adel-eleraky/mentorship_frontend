import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";  // Import visibility icons

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const [apiMessage, setApiMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);  // State to toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State to toggle confirm password visibility
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password should be at least 8 characters")
        .min(8, "Password should be at least 8 characters long")
        .max(29, "Password should be at most 29 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .min(8, "Password should be at least 8 characters long")
        .max(29, "Password should be at most 29 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Confirm new password is required"),

    }),
    onSubmit: async (values) => {
      try {
        setApiMessage(null);
        setIsLoading(true);

        const response = await axios.post(
          `http://localhost:3000/api/v1/auth/reset-password/${token}`,
          { newPassword: values.newPassword }
        );

        if (response.status === 200) {
          setApiMessage("✅ Password reset successful! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (error) {
        setApiMessage(error.response?.data?.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Your Password
        </Typography>
        <Typography variant="body1" align="center">
          Enter your new password below.
        </Typography>

        {apiMessage && <Typography variant="body2" color="success.main" align="center" mt={2}>{apiMessage}</Typography>}

        <form onSubmit={formik.handleSubmit}>
          {/* New Password Field */}
          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? "text" : "password"}  // Toggle between text and password type
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("newPassword")}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}  // Toggle password visibility
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}  // Toggle between text and password type
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps("confirmPassword")}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}  // Toggle password visibility
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>
        </form>
      </Box>
      <br />
    </Container>
  );
}
