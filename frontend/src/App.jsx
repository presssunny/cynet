import React from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import darkTheme from "./theme/darkTheme";

// שימי לב לאותיות הגדולות ולסיומת .jsx - זה קריטי!
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useState } from "react";

function TheForm({ handleSumbit }) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      }}
    >
      <TextField placeholder="first name"></TextField>
      <TextField placeholder="last name"></TextField>
      <button onSubmit={handleSumbit}>Submit</button>
    </form>
  );
}
function App() {
  const [count, setCount] = useState(0);
  function handleSumbit() {
    e.preventDefault();
  }

  return (
    <Box
      sx={{
        width: "600px",
        height: "900px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      {" "}
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        + 1
      </Button>
      <Typography variant="h6">{count}</Typography>
      <TheForm handleSumbit={handleSumbit} />
    </Box>
  );
}

export default App;
