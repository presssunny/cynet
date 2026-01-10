import React from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';
import config from './config'; 

function App() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* כותרת עליונה כחולה */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            {config.appTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* טעינת הדף שיצרנו */}
      <Dashboard />
      
    </Box>
  );
}

export default App;