import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0c15', // צבע הרקע הכללי (כהה מאוד)
      paper: '#151725',   // צבע הכרטיסיות (טיפה יותר בהיר)
    },
    primary: {
      main: '#3b82f6', // כחול
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // פונט נקי
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // פינות עגולות לכרטיסיות
          backgroundImage: 'none', 
          backgroundColor: '#151725', 
        },
      },
    },
  },
});

export default darkTheme;
