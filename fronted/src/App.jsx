import React from 'react';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import darkTheme from './theme/darkTheme'; // וודאי שהנתיב הזה נכון!
import Sidebar from './components/Sidebar';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {}
      
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {}
        <Header />
        <Sidebar />

        {}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 260px)` },
            ml: { sm: `260px` },
            mt: 8 
          }}
        >
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;