import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/Styles/StyledComponents";

import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usernameValidator } from "../utils/validators";
import { bgColrGrad } from "../constants/colors";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const password = useStrongPassword(); to make password strong use useStrongPassword hook

  const password = useInputValidation("");

  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");
    
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message,{id:toastId});
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong",{id:toastId});
    }finally{
      setIsLoading(false);
    }

    // console.log("login", username.value, password.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("avatar", avatar.file);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      dispatch(userExists(data.user));
      toast.success(data.message ,{id:toastId});
  
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId});
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: bgColrGrad,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          marginTop: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: " #F5F5F5",
          }}
        >
          {isLogin ? (
            <>
              <Typography
                variant="h5"
                sx={{ color: "black", fontWeight: "bold" }}
              >
                Login
              </Typography>

              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    width: "60%",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign in
                </Button>

                <Typography
                  textAlign={"center"}
                  sx={{ marginTop: "1rem", color: "gray" }}
                >
                  Don't have any account ?
                </Typography>
                <Button
                  disabled={isLoading}
                  sx={{
                    width: "60%",
                  }}
                  variant="text"
                  color="secondary"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h5"
                sx={{ color: "black", fontWeight: "bold", marginBottom: "5px" }}
              >
                Sign Up
              </Typography>

              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 5,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.4)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography m={"1rem"} color="error" variant="caption">
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  placeholder="Add Bio.."
                  required
                  fullWidth
                  label="Bio"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* to make password strong */}

                {/* {password.error && (
                <Typography color='error' variant='caption' >{password.error}</Typography>
              )} */}

                <Button
                  sx={{
                    marginTop: "1rem",
                    width: "60%",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  // fullWidth
                >
                  Sign Up
                </Button>

                <Typography
                  textAlign={"center"}
                  sx={{ marginTop: "1rem", color: "gray" }}
                >
                  Already have an account ?
                </Typography>
                <Button
                  disabled={isLoading}
                  sx={{
                    width: "60%",
                  }}
                  variant="text"
                  color="secondary"
                  // fullWidth
                  onClick={() => setIsLogin((prev) => !prev)}
                >
                  sign in
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
