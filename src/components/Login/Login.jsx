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
  RadioGroup
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthentication } from "../../Context/AuthContext";

import io from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../rtk/features/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Invalid password"
    )
    .required("Password is required"),
});

function Login() {

  // ========================= VE ==============================

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const [apiError, setApiError] = useState(null);
  // const { setToken, tokenKey, setUser } = useAuthentication();
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const { user, loading } = useSelector(state => state.auth)
  if (user) {
    if (user.role === "mentor") return navigate("/mentor")
    if (user.role === "user") return navigate("/user")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      role: ""
    },
  });

  // Called when user submits the form
  async function onSubmit(values) {
    // try {
    //   setIsLoading(true);
    //   setApiError(null);

    //   console.log(values)

    //   const response = await axios.post("http://localhost:3000/api/v1/auth/login", values);

    //   if (response.status === 200) {
    //     console.log(response)
    //     console.log("Login successful:", response.data);
    //     localStorage.setItem(tokenKey, response.data.token);
    //     setToken(response.data.token);

    //     // setUser(response.data.data)
    //     toast.success("Login successful!", { autoClose: 500 });

    //     setTimeout(() => {
    //       navigate("/");
    //     }, 1000);
    //   } else {
    //     console.log("Unexpected response:", response);
    //   }
    // } catch (error) {
    //   console.error("Error response data:", error.response?.data);
    //   setApiError(error.response?.data?.message || "Login failed");
    // } finally {
    //   setIsLoading(false);
    // }
    dispatch(loginUser(values))
  }


  return (
    <>

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
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
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
                    ),
                  }}
                />
              </Grid>

              {/* Login as User or Mentor */}
              <Grid item xs={12}>
                <RadioGroup>
                  <FormControlLabel
                    control={<Radio {...register("role")} value="user" />}
                    label="User"
                  />
                  <FormControlLabel
                    control={<Radio {...register("role")} value="mentor" />}
                    label="Mentor"
                  />
                </RadioGroup>
              </Grid>
              {/* Remember Me */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" />}
                  label="Remember Me"
                />
              </Grid>

              {/* Don't have an account? */}
              <Grid item xs={12}>
                <Typography align="center" variant="body2">
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Grid>
              {/* Error from API */}
              {/* {apiError && (
                <Grid item xs={12}>
                  <Typography color="error">{apiError}</Typography>
                </Grid>
              )} */}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

    </>
  );
}

export default Login