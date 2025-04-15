import { useState } from "react";
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
  CircularProgress
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../rtk/features/authSlice";

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8).max(29)
    .matches(/[a-z]/).matches(/[A-Z]/)
    .matches(/\d/).matches(/[@$!%*?&]/),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^01[0-9]{9}$/, "Phone must be a valid Egyptian number")
    .required("Phone number is required"),
  role: Yup.string().required("Role is required").oneOf(["User", "Mentor"]),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("User");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, errors: serverErrors, registerStatus } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      phone: "",
      role: "User"
    },
  });

  const onSubmit = async (data) => {
    const payload = { ...data, role: selectedRole };
    dispatch(registerUser(payload));
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
      {registerStatus !== "success" ? (
        <Box
          sx={{
            mt: 1,
            mb: 1,
            p: 4,
            boxShadow: 2,
            borderRadius: 1,
            bgcolor: "background.paper",
          }}
          maxWidth="sm"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Role Toggle Tabs */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  borderBottom: "2px solid #ccc",
                  mb: 2,
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
            </Grid>

            <Grid container spacing={3}>
              {/* Name */}
              <Grid item xs={12}>
                <Typography sx={labelStyle}>Full Name</Typography>
                <TextField
                  fullWidth
                  {...register("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  sx={inputStyles}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Typography sx={labelStyle}>Email Address</Typography>
                <TextField
                  fullWidth
                  {...register("email")}
                  error={Boolean(errors.email) || Boolean(serverErrors?.email)}
                  helperText={errors.email?.message ?? serverErrors?.email}
                  sx={inputStyles}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12}>
                <Typography sx={labelStyle}>Phone Number</Typography>
                <TextField
                  fullWidth
                  {...register("phone")}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
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
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
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

              {/* Confirm Password */}
              <Grid item xs={12}>
                <Typography sx={labelStyle}>Confirm Password</Typography>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmedPassword")}
                  error={Boolean(errors.confirmedPassword)}
                  helperText={errors.confirmedPassword?.message}
                  sx={inputStyles}
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

              {/* Terms */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox required />}
                  label="I agree to the terms and conditions"
                  sx={{
                    fontSize: "14px",
                    textTransform: "none",
                    color: "#118577",
                  }}
                />
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
                  startIcon={!loading && <PersonAddIcon />}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      ) : (
        <Box
          sx={{
            my: 5,
            p: 4,
            boxShadow: 2,
            borderRadius: 1,
            bgcolor: "background.default",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            We have sent an email to you. Check your inbox and verify your email address to complete the registration process.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
