import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axiosClient from '../api/axiosClient'; 
import AlertsTable from '../components/AlertsTable';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // משיכת רשימת ההתראות
      const bulkResponse = await axiosClient.get('/alerts/bulk', {
        params: { Limit: 50, Offset: 0 }
      });
      if (bulkResponse.data && bulkResponse.data.Entities) {
        setAlerts(bulkResponse.data.Entities);
      }
      
      // משיכת כמות ההתראות
      const countResponse = await axiosClient.get('/alerts/count');
      setTotalCount(countResponse.data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch data from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* כרטיסיית המונה */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#1976d2', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Alerts</Typography>
              <Typography variant="h3">
                {loading ? <CircularProgress color="inherit" size={30} /> : totalCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* הודעת שגיאה אם יש */}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      
      {/* הטבלה */}
      <AlertsTable alerts={alerts} loading={loading} />
    </Container>
  );
};

export default Dashboard;