import React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, Typography, Chip, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RecommendedActions = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Recommended Actions" />
      <CardContent>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#9ca3af' }} />
                <Typography sx={{ color: 'white' }}>Reboot overloaded node</Typography>
            </Box>
            <Chip label="critical" size="small" sx={{ bgcolor: '#ef4444', color: 'white' }} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;