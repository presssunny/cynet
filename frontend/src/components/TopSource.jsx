import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
} from "@mui/material";

const rows = [
  {
    source: "Security Gateway",
    alerts: 248,
    status: "degraded",
    date: "2025-10-26, 14:15",
  },
  {
    source: "Network Node 4",
    alerts: 198,
    status: "medium",
    date: "2025-10-27, 16:30",
  },
  {
    source: "System Monitor EU",
    alerts: 132,
    status: "stable",
    date: "2025-10-27, 17:24",
  },
  {
    source: "Load Balancer",
    alerts: 118,
    status: "stable",
    date: "2025-10-28, 14:38",
  },
  {
    source: "Authentication API",
    alerts: 176,
    status: "critical",
    date: "2025-10-29, 09:41",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "critical":
      return { bg: "#ef4444", color: "#fff" };
    case "degraded":
      return { bg: "#f97316", color: "#fff" };
    case "medium":
      return { bg: "#eab308", color: "#000" };
    case "stable":
      return { bg: "#374151", color: "#d1d5db" };
    default:
      return { bg: "#374151", color: "#fff" };
  }
};

const TopSources = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title="Top Sources by Alert Volume"
        action={
          <Typography
            variant="body2"
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            View All &gt;
          </Typography>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#9ca3af" }}>Source</TableCell>
                <TableCell sx={{ color: "#9ca3af" }}>Alerts</TableCell>
                <TableCell sx={{ color: "#9ca3af" }}>Status</TableCell>
                <TableCell sx={{ color: "#9ca3af" }}>Last Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.source}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold", color: "#fff" }}
                  >
                    {row.source}
                  </TableCell>
                  <TableCell sx={{ color: "#d1d5db" }}>{row.alerts}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(row.status).bg,
                        color: getStatusColor(row.status).color,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                    {row.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TopSources;
