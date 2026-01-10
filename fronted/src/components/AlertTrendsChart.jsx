import React from 'react';
import { Card, Box, Button, ButtonGroup, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', info: 50, warning: 60, critical: 40 },
  { name: 'Tue', info: 40, warning: 80, critical: 60 },
  { name: 'Wed', info: 60, warning: 70, critical: 80 },
  { name: 'Thu', info: 30, warning: 50, critical: 50 },
  { name: 'Fri', info: 70, warning: 60, critical: 30 },
  { name: 'Sat', info: 80, warning: 50, critical: 40 },
  { name: 'Sun', info: 50, warning: 60, critical: 70 },
];

const AlertTrendsChart = () => {
  return (
    <Card sx={{ height: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <ButtonGroup variant="contained" size="small" sx={{ bgcolor: '#1f2937' }}>
          <Button sx={{ bgcolor: '#3b82f6' }}>Alert trends</Button>
          <Button sx={{ bgcolor: 'transparent', color: '#9ca3af' }}>Resolution performance</Button>
        </ButtonGroup>
      </Box>

      <Box sx={{ height: 250, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d3748" />
            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: 'white' }} />
            <Bar dataKey="info" stackId="a" fill="#6b7280" />
            <Bar dataKey="warning" stackId="a" fill="#f59e0b" />
            <Bar dataKey="critical" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default AlertTrendsChart;