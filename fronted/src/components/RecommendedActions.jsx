import React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, Typography, Chip, Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const actions = [
  { text: 'Reboot overloaded node in EU region', sub: 'Network Ops', severity: 'critical' },
  { text: 'Rotate SSL certificates expiring soon', sub: 'Security', severity: 'high' },
  { text: 'Recheck authentication timeout policy', sub: 'IT Support', severity: 'medium', completed: true },
];

const getSeverityColor = (sev) => {
  switch (sev) {
    case 'critical': return { bg: '#ef4444', color: '#fff' };
    case 'high': return { bg: '#f97316', color: '#fff' };
    case 'medium': return { bg: '#eab308', color: '#000' };
    default: return { bg: '#374151', color: '#fff' };
  }
};

const RecommendedActions = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Recommended Actions" 
        action={<Typography variant="body2" sx={{ color: '#9ca3af', cursor: 'pointer' }}>View All &gt;</Typography>}
      />
      <CardContent sx={{ p: 0 }}>
        <List>
          {actions.map((item, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                borderBottom: '1px solid #1f2937', 
                py: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                opacity: item.completed ? 0.5 : 1
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {item.completed ? 
                  <CheckCircleIcon sx={{ color: '#9ca3af' }} /> : 
                  <RadioButtonUncheckedIcon sx={{ color: '#9ca3af' }} />
                }
                <Box>
                  <Typography variant="body1" sx={{ color: 'white', textDecoration: item.completed ? 'line-through' : 'none' }}>
                    {item.text}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>{item.sub}</Typography>
                </Box>
              </Box>
              
              <Chip 
                label={item.severity} 
                size="small" 
                sx={{ 
                  bgcolor: getSeverityColor(item.severity).bg, 
                  color: getSeverityColor(item.severity).color,
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }} 
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;