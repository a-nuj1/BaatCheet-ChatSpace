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
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/Styles/StyledComponents";

import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validators";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);

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
      backgroundImage:
        "linear-gradient(to bottom, rgb(208 155 215 / 80%), rgb(128 209 125 / 50%)), url('https://images.unsplash.com/photo-1496205856088-91b021308c54?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
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
