import React from "react";
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import darkTheme from "./theme/darkTheme";

// שימי לב לאותיות הגדולות ולסיומת .jsx - זה קריטי!
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [count, setCount] = useState(0);

  function handleSumbit() {}

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
      }}
    ></Box>
  );
}

export default App;
