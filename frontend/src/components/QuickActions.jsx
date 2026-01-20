import React from 'react';
import { Card, CardHeader, CardContent, Button, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const QuickActions = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Quick Actions" />
      <CardContent>
        <Stack spacing={2}>
          <Button variant="outlined" startIcon={<PlayArrowIcon />} sx={{ color: 'white', borderColor: '#374151' }}>
            Run health check
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuickActions;