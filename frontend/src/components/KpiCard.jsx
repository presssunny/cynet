import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// נתונים פיקטיביים לגרף הקטן
const demoData = [
  { value: 10 }, { value: 25 }, { value: 15 }, { value: 40 }, 
  { value: 30 }, { value: 60 }, { value: 50 }, { value: 80 }
];

const KpiCard = ({ title, count, color, percent, icon: Icon }) => {
  return (
    <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden' 
    }}>
      <CardContent sx={{ pb: 0 }}>
        
        {/* Header: Icon & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar variant="rounded" sx={{ 
              bgcolor: `${color}15`, 
              color: color,          
              border: `1px solid ${color}40` 
          }}>
            <Icon />
          </Avatar>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>

        {/* Big Number */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
            {count.toLocaleString()}
            </Typography>
            
            {title.includes('Resolved') && (
                <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>
                    (77%)
                </Typography>
            )}
        </Box>

        {/* Stats Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 2 }}>
          <TrendingUpIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{percent}%</span> last week
          </Typography>
        </Box>

      </CardContent>

      {/* Recharts: Tiny Area Chart at the bottom */}
      <Box sx={{ height: 60, width: '100%', mt: 'auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={demoData}>
            <defs>
              <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fill={`url(#color-${title})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

    </Card>
  );
};

export default KpiCard;