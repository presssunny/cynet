import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./theme/darkTheme";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
