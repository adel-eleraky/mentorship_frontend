import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../rtk/features/authSlice";

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be at least 3 characters long")
    .max(30, "Name should be at most 30 characters long")
    .required("Name is required"),
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
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone number must be 10-15 digits")
    .required("Phone number is required"),
});

export default function Register() {
  // State for managing visibility of password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, user, errors: serverErrors } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log("user after register", user)
  console.log(serverErrors)
  // Getting authentication functions and loading state from context
  // const { register: registerUser, authError, isLoading, setAuthError, setIsLoading } = useAuthentication();

  // Using react-hook-form for form validation and handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur so errors show when user leaves a field
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      phone: "",
      role: ""
    },
  });

  const navigate = useNavigate(); // Use navigate from react-router-dom

  // Registration function called on form submit
  const registerUserData = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/register", userData);
      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      } else {
        setAuthError(`Unexpected response: ${response.status}`);
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError(error.response?.data?.message || "Registration failed"); // Access the 'message' property

    } finally {
      setIsLoading(false);
    }
  };

  // Called when the user submits the form
  const onSubmit = async (data) => {

    dispatch(registerUser(data))
    // await registerUserData(data);
  };

  return (
    <Container maxWidth="sm">
      {!user && (
        <Box
          sx={{
            mt: 4,
            mb: 4,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Full Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  error={Boolean(errors.email) || Boolean(serverErrors?.email)}
                  helperText={errors.email?.message ?? serverErrors?.email}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register("phone")}
                  error={Boolean(errors.phone) || Boolean(serverErrors?.phone)}
                  helperText={errors.phone?.message ?? serverErrors?.phone}
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

              {/* Confirm Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmedPassword")}
                  error={Boolean(errors.confirmedPassword)}
                  helperText={errors.confirmedPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              {/* Terms & Conditions */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox required />}
                  label="I agree to the terms and conditions"
                />
              </Grid>

              {/* Error from Context */}
              {/* {authError && (
              <Grid item xs={12}>
                <Typography color="error">{authError}</Typography>
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
      {user && !user.confirmEmail && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            boxShadow: 2,
            borderRadius: 1,
            bgcolor: "background.default",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Please verify your email address to complete the registration process.
          </Typography>
        </Box>
      )}
    </Container>
  );
}