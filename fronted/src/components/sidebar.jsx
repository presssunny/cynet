import React, { useState } from 'react';
import { 
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, 
  Typography, Box, Collapse, Divider 
} from '@mui/material';

// ייבוא כל האייקונים לפי התמונה שלך
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboards
import DomainIcon from '@mui/icons-material/Domain'; // Infrastructure
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Alerts
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Identity
import DevicesIcon from '@mui/icons-material/Devices'; // Devices
import SecurityIcon from '@mui/icons-material/Security'; // Threat Intel
import EmailIcon from '@mui/icons-material/Email'; // Email
import GavelIcon from '@mui/icons-material/Gavel'; // GRC
import LinkIcon from '@mui/icons-material/Link'; // Supply Chain
import CloudQueueIcon from '@mui/icons-material/CloudQueue'; // SSE
import CloudIcon from '@mui/icons-material/Cloud'; // Data Security
import HubIcon from '@mui/icons-material/Hub'; // Network
import CampaignIcon from '@mui/icons-material/Campaign'; // Awareness

// אייקונים לחצים (למעלה/למטה)
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // לוגו

const drawerWidth = 260;

const Sidebar = () => {
  // ניהול מצב הפתיחה של "Alerts and Events"
  const [openAlerts, setOpenAlerts] = useState(true);

  const handleAlertsClick = () => {
    setOpenAlerts(!openAlerts);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: '#0b0c15', // רקע שחור עמוק
            color: '#9ca3af', // צבע טקסט אפור בהיר
            borderRight: '1px solid #1f2937'
        },
      }}
    >
      {/* 1. לוגו - IT GURU */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: 'white' }}>
        <VerifiedUserIcon sx={{ color: '#3b82f6' }} /> {/* אייקון כחול */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          IT-GURU
        </Typography>
      </Box>

      {/* אזור גלילה לתפריט */}
      <Box sx={{ overflowY: 'auto' }}>
        <List component="nav">
            
            {/* Dashboards */}
            <ListItemButton>
              <ListItemIcon><DashboardIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Dashboards" />
            </ListItemButton>

            {/* Infrastructure */}
            <ListItemButton>
              <ListItemIcon><DomainIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Infrastructure" />
            </ListItemButton>

            {/* --- Alerts and Events (נפתח) --- */}
            <ListItemButton onClick={handleAlertsClick} sx={{ color: 'white' }}> 
              <ListItemIcon>
                <NotificationsActiveIcon sx={{ color: 'white' }} /> {/* אייקון לבן כי הוא פעיל */}
              </ListItemIcon>
              <ListItemText primary="Alerts and Events" primaryTypographyProps={{ fontWeight: 'bold' }} />
              {openAlerts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            {/* תת-תפריט שנפתח */}
            <Collapse in={openAlerts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                {/* Overview (מודגש עם פס כחול) */}
                <ListItemButton sx={{ pl: 4, borderLeft: '3px solid #3b82f6', bgcolor: 'rgba(59, 130, 246, 0.1)' }}>
                  <ListItemText primary="Overview" sx={{ color: 'white' }} />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Security" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Network" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="System" />
                </ListItemButton>
              </List>
            </Collapse>
            {/* --- סוף Alerts --- */}

            {/* שאר הפריטים מהתמונה */}
            <ListItemButton>
              <ListItemIcon><VpnKeyIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Identity & Passwords" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon><DevicesIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Devices" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon><SecurityIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Threat Intelligence" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon><EmailIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="E-Mail" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon><GavelIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="GRC" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon><LinkIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Supply Chain" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon><CloudQueueIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="SSE" />
            </ListItemButton>

             <ListItemButton>
              <ListItemIcon><CloudIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Data Security" />
            </ListItemButton>

             <ListItemButton>
              <ListItemIcon><HubIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Network" />
            </ListItemButton>

             <ListItemButton>
              <ListItemIcon><CampaignIcon sx={{ color: '#9ca3af' }} /></ListItemIcon>
              <ListItemText primary="Awareness & Campaigns" />
            </ListItemButton>

        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;