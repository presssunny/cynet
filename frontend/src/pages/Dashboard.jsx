import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import axiosClient from "../api/axiosClient";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import KpiCard from "../components/KpiCard";
import AlertTrendsChart from "../components/AlertTrendsChart";
import RecentAlerts from "../components/RecentAlerts";
import TopSource from "../components/TopSource";
import AccessIssues from "../components/AccessIssues";
import RecommendedActions from "../components/RecommendedActions";
import QuickActions from "../components/QuickActions";

const Dashboard = () => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axiosClient
      .get("/alerts/count")
      .then((res) => setTotalCount(res.data))
      .catch(console.error);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          Overview
        </Typography>
      </Box>

      {}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <KpiCard
            title="Total Alerts"
            count={totalCount || 1278}
            percent={12}
            color="#3b82f6"
            icon={WarningAmberIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KpiCard
            title="Critical Alerts"
            count={112}
            percent={8}
            color="#ef4444"
            icon={ReportProblemIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KpiCard
            title="Resolved Alerts"
            count={972}
            percent={8}
            color="#3b82f6"
            icon={CheckCircleOutlineIcon}
          />
        </Grid>
      </Grid>

      {/* שורה 2: גרפים וטבלאות */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AlertTrendsChart />
            </Grid>
            <Grid item xs={12}>
              <TopSources />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentAlerts />
        </Grid>
      </Grid>

      {/* שורה 3: הרכיבים התחתונים שיצרנו עכשיו */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <AccessIssues />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecommendedActions />
        </Grid>
        <Grid item xs={12} md={3}>
          <QuickActions />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
