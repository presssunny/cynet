import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const alerts = [
  { title: "Warsaw DC reaching capacity", time: "5 min ago", severity: "low" },
  {
    title: "SSL certificate expiring in 7 days",
    time: "1 hour ago",
    severity: "medium",
  },
  {
    title: "Backup completed successfully",
    time: "2 hours ago",
    severity: "low",
  },
  {
    title: "High latency detected in Dubai",
    time: "3 hours ago",
    severity: "high",
  },
  {
    title: "Disk usage above 80% on 3 servers",
    time: "4 hours ago",
    severity: "high",
  },
];

const getSeverityColor = (sev) => {
  switch (sev) {
    case "high":
      return { bg: "#ffedd5", text: "#c2410c" };
    case "medium":
      return { bg: "#fef9c3", text: "#a16207" };
    default:
      return { bg: "#e5e7eb", text: "#374151" };
  }
};

const RecentAlerts = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title="Recent Alerts"
        titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip label="All" color="primary" size="small" />
            <Chip
              label="Critical alerts"
              variant="outlined"
              size="small"
              sx={{ color: "#9ca3af", borderColor: "#374151" }}
            />
          </Box>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <List>
          {alerts.map((alert, index) => {
            const colors = getSeverityColor(alert.severity);
            return (
              <ListItem
                key={index}
                sx={{ borderBottom: "1px solid #1f2937", py: 2 }}
              >
                <ListItemText
                  primary={alert.title}
                  secondary={alert.time}
                  primaryTypographyProps={{
                    sx: { color: "white", fontWeight: 500, fontSize: "0.9rem" },
                  }}
                  secondaryTypographyProps={{
                    sx: { color: "#9ca3af", fontSize: "0.8rem" },
                  }}
                />
                <Chip
                  label={alert.severity}
                  size="small"
                  sx={{
                    bgcolor: colors.bg,
                    color: colors.text,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    height: 24,
                  }}
                />
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#9ca3af",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            View All <NavigateNextIcon fontSize="small" />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
