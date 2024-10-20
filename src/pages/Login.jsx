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

function Login() {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login", username.value, password.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(
      "signup",
      name.value,
      bio.value,
      username.value,
      password.value,
      avatar.file
    );
  };

  return (
    <div
    style={{
      backgroundImage:bgColrGrad,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
            backgroundColor: ' #F5F5F5',
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
