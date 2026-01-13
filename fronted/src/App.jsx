import React from 'react';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import darkTheme from './theme/darkTheme';

// שימי לב לאותיות הגדולות ולסיומת .jsx - זה קריטי!
import Sidebar from './components/Sidebar.jsx'; 
import Header from './components/Header.jsx';   
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'background.default',
            minHeight: '100vh',
            width: { sm: `calc(100% - 260px)` },
            ml: { sm: `260px` },
          }}
        >
          <Toolbar />
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;