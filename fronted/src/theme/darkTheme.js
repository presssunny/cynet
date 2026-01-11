import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // זה החלק הקריטי שהופך הכל לכהה
    background: {
      default: "#0b0c15", // רקע כללי שחור עמוק
      paper: "#151725", // רקע כרטיסיות (טיפה יותר בהיר)
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af",
    },
    primary: {
      main: "#3b82f6",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // מבטל רקע דיפולטיבי של MUI
          backgroundColor: "#151725",
          borderRadius: "12px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0b0c15",
          scrollbarColor: "#6b7280 #0b0c15",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#0b0c15",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b7280",
            minHeight: 24,
          },
        },
      },
    },
  },
});

export default darkTheme;
