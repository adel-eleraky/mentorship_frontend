import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// MUI components
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// Redux + Thunks
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../rtk/features/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 characters long")
    .max(29, "At most 29 characters long")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),

  // ✅ Require role to be either 'User' or 'Mentor'
  role: Yup.string()
    .required("Please select a role")
    .oneOf(["User", "Mentor"], "Role must be 'User' or 'Mentor'")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { user, loading, errors: serverErrors } = useSelector((state) => state.auth);

  // If user is already logged in, redirect them
  if (user) {
    if (user.role === "mentor") return navigate("/mentor");
    if (user.role === "user") return navigate("/user");
  }

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      role: ""
    }
  });

  // Submit handler
  const onSubmit = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          mb: 4,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper"
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                {...register("email")}
                error={
                  Boolean(errors.email) || Boolean(serverErrors?.email)
                }
                helperText={
                  errors.email?.message ?? serverErrors?.email
                }
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={
                  Boolean(errors.password) || Boolean(serverErrors?.password)
                }
                helperText={
                  errors.password?.message ?? serverErrors?.password
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Role (User or Mentor) - Required */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Login as</FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    control={<Radio {...register("role")} value="User" />}
                    label="User"
                  />
                  <FormControlLabel
                    control={<Radio {...register("role")} value="Mentor" />}
                    label="Mentor"
                  />
                </RadioGroup>
              </FormControl>
              {/* Show Yup error if no role selected */}
              {errors.role && (
                <Typography color="error" variant="body2">
                  {errors.role.message}
                </Typography>
              )}
              {/* Potential server error about role (less common) */}
              {serverErrors?.role && (
                <Typography color="error" variant="body2">
                  {serverErrors.role}
                </Typography>
              )}
            </Grid>

            {/* Remember Me */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="rememberMe" />}
                label="Remember Me"
              />
            </Grid>

            {/* OPTIONAL: A top-level server error (e.g., "Please confirm your email") */}
            {serverErrors?.message && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {serverErrors.message}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography align="center" variant="body2">
                <Button
                  variant="text"
                  color="success"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </Button>
              </Typography>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Grid>

            {/* Don't have an account? Sign Up */}
            <Grid item xs={12}>
              <Typography align="center" variant="body2">
                Don't have an account?{" "}
                <Button
                  variant="text"
                  color="success"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;