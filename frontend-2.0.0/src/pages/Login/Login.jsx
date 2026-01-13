// Login.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import Logo from "../../assets/ItGuruLogo.png";
import Poster from "../../assets/ItGuruLogo.png";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const handleSSOLogin = () => {
    window.location.href =
      "https://itguru.doubleoctopus.io/saml/368dbd1f-b4ab-4527-9038-78e0697fb2ed/login";
  };
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        zIndex: 3,
        height: "100%",
      }}
    >
      <img
        src={Poster}
        alt="poster"
        style={{
          position: "relative",
          top: 0,
          right: 500,
          width: "100%",
          height: "auto",
          // objectFit: "cover",
          zIndex: 9999,
          objectFit: "contain",
          opacity: theme.palette.mode === "dark" ? 0.2 : 0.7,

          filter:
            theme.palette.mode === "dark"
              ? "drop-shadow(0 0 18px rgba(66, 136, 177, 0.53))"
              : "drop-shadow(0 0 18px rgba(66, 136, 177, 0.53))",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: theme.palette.background.main,
          zIndex: 90,
        }}
      >
        <img
          src={Logo}
          style={{
            filter: theme.palette.mode === "dark" ? "unset" : "invert(1)",
            width: "250px",
          }}
        />
        {/* <h2>IT GURU PORTAL</h2>
        <Typography>Security Portal</Typography> */}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "70%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <Button onClick={() => navigate("/")}>Login With SSO</Button>
      </div>
    </div>
  );
};

export default Login;
