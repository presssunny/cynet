import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AccessIssues = () => {
  return (
    <Card
      sx={{ height: "100%", bgcolor: "#172033", border: "1px solid #1f2937" }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "8px",
                bgcolor: "rgba(59, 130, 246, 0.2)",
              }}
            >
              <SecurityIcon sx={{ color: "#3b82f6" }} />
            </Box>
            <Typography variant="h6">Access Issues</Typography>
          </Box>

          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            12
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mb: 2 }}>
            Incidents detected
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#9ca3af", display: "block" }}
          >
            5 critical • 4 resolved • 2 in progress
          </Typography>
        </Box>

        <Button
          variant="outlined"
          endIcon={<NavigateNextIcon />}
          sx={{
            mt: 3,
            borderColor: "#374151",
            color: "#9ca3af",
            justifyContent: "space-between",
            textTransform: "none",
            "&:hover": { borderColor: "#9ca3af", bgcolor: "transparent" },
          }}
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccessIssues;
