import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../rtk/features/authSlice";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
  .required("Email is required")
  .matches(
    /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.(com|org|net|io|edu)$/i,
    "Email must have letters, numbers, or dots before @, only letters after @, and end with .com, .org, .net, .io, or .edu"
  ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 characters long")
    .max(29, "At most 29 characters long")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),
  role: Yup.string()
    .required("Please select a role")
    .oneOf(["User", "Mentor"], "Role must be 'User' or 'Mentor'"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("User");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, errors: serverErrors } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "User",
    },
  });

  useEffect(() => {
    setValue("role", selectedRole);
  }, [selectedRole, setValue]);

  if (user) {
    if (user.role === "mentor") return navigate("/mentor");
    if (user.role === "user") return navigate("/user");
  }

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#fff",
      transition: "0.3s",
      "& fieldset": {
        borderColor: "#ccc",
        transition: "0.3s",
      },
      "&:hover fieldset": {
        borderColor: "#118577",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#172E59",
        boxShadow: "0 0 0 2px rgba(23, 46, 89, 0.2)",
      },
    },
    "& input": {
      padding: "12px",
      fontSize: "16px",
    },
  };

  const labelStyle = {
    color: "#172E59",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  return (
    <Container
      maxWidth=""
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(#ffffff 0%, #8DD2D2 40%)",
      }}
    >
      <Box
        sx={{
          mt: 4,
          mb: 4,
          p: 4,
          boxShadow: 2,
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
        maxWidth="sm"
      >
        {/* <Typography
          variant="h3"
          align="left"
          gutterBottom
          sx={{ color: "#172E59" }}
        >
          Login :
        </Typography> */}

        {/* Role Selector Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            borderBottom: "2px solid #ccc",
            mb: 3,
          }}
        >
          {["User", "Mentor"].map((role) => (
            <Box
              key={role}
              onClick={() => {
                setSelectedRole(role);
                setValue("role", role);
              }}
              sx={{
                cursor: "pointer",
                padding: "10px 25px",
                fontWeight: "bold",
                borderBottom: selectedRole === role ? "3px solid #118577" : "3px solid transparent",
                color: selectedRole === role ? "#172E59" : "#aaa",
                fontSize: "16px",
                transition: "0.3s",
              }}
            >
              {role === "User" ? "I'm a User" : "I'm a Mentor"}
            </Box>
          ))}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Email */}
            <Grid item xs={12}>
              <Typography sx={labelStyle}>Email Address</Typography>
              <TextField
                fullWidth
                type="email"
                {...register("email")}
                error={Boolean(errors.email) || Boolean(serverErrors?.email)}
                helperText={errors.email?.message ?? serverErrors?.email}
                sx={inputStyles}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Typography sx={labelStyle}>Password</Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={Boolean(errors.password) || Boolean(serverErrors?.password)}
                helperText={errors.password?.message ?? serverErrors?.password}
                sx={inputStyles}
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

            {/* Hidden Role Field (synced with role toggle) */}
            <input type="hidden" {...register("role")} value={selectedRole} />

            {errors.role && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {errors.role.message}
                </Typography>
              </Grid>
            )}

            {/* Remember Me */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="rememberMe" />}
                label="Remember Me"
              />
            </Grid>

            {/* Top-Level Server Error */}
            {serverErrors?.message && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {serverErrors.message}
                </Typography>
              </Grid>
            )}

            {/* Forgot Password */}
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
                disabled={loading}
                sx={{
                  fontSize: "16px",
                  padding: "10px",
                  borderRadius: "3px",
                  boxShadow: 3,
                  textTransform: "none",
                  backgroundColor: "#172E59",
                  "&:hover": {
                    backgroundColor: "#172E59",
                    boxShadow: 6,
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Grid>

            {/* Register Link */}
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
