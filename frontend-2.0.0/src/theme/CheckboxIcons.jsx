import React from "react";
import { Box } from "@mui/material";

export const UncheckedIcon = (
  <Box
    sx={{
      width: 20,
      height: 20,
      borderRadius: "8px",
      border: "2px solid #9CA3AF",
      backgroundColor: "transparent",
      "&:hover": { borderColor: "#FFFFFF" },
    }}
  />
);

export const CheckedIcon = (
  <Box
    sx={{
      width: 20,
      height: 20,
      borderRadius: "8px",
      backgroundColor: "primary.main",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
      <path
        d="M1 4.5L4.5 8L11 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);
