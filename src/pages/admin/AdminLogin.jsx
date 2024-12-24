import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { bgColrGrad } from "../../constants/colors";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";



function AdminLogin() {

  const {isAdmin} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const secertKey = useInputValidation("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secertKey.value));
  };

  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch]);


  if(isAdmin)return <Navigate to="/admin/dashboard" />;
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
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Admin Login
          </Typography>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Secret Key"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={secertKey.value}
              onChange={secertKey.changeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
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
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default AdminLogin;
