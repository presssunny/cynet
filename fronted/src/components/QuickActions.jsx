import React from "react";
import { Card, CardHeader, CardContent, Button, Stack } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import RuleIcon from "@mui/icons-material/Rule";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const QuickActions = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Quick Actions" />
      <CardContent>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DescriptionIcon />}
            sx={{
              justifyContent: "flex-start",
              color: "white",
              borderColor: "#374151",
              py: 1.5,
            }}
          >
            Generate report
          </Button>
          <Button
            variant="outlined"
            startIcon={<RuleIcon />}
            sx={{
              justifyContent: "flex-start",
              color: "white",
              borderColor: "#374151",
              py: 1.5,
            }}
          >
            View alert rules
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlayArrowIcon />}
            sx={{
              justifyContent: "flex-start",
              color: "white",
              borderColor: "#374151",
              py: 1.5,
            }}
          >
            Run health check
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
