import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Button,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const drawerWidth = 260; // צריך להיות תואם לרוחב ה-Sidebar

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0} // בלי צל
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "#0b0c15", // רקע שחור
        borderBottom: "1px solid #1f2937", // קו מפריד עדין
        py: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* צד שמאל: שם חברה + חיפוש */}
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center", width: "50%" }}
        >
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              color: "#9ca3af",
              bgcolor: "#1f2937",
              textTransform: "none",
              px: 2,
              "&:hover": { bgcolor: "#374151" },
            }}
          >
            It-Guru Comp.
          </Button>

          {/* תיבת חיפוש */}
          <Box sx={{ position: "relative", width: "100%", maxWidth: 400 }}>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                height: "100%",
                pl: 1.5,
                color: "#9ca3af",
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                color: "white",
                bgcolor: "#1f2937",
                borderRadius: 1,
                width: "100%",
                pl: 5,
                py: 0.5,
                "& input::placeholder": { color: "#6b7280" },
              }}
            />
          </Box>
        </Box>

        {/* צד ימין: תאריכים, אייקונים ופרופיל */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              color: "white",
              bgcolor: "#1f2937",
              textTransform: "none",
              px: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            Last 7 days
          </Button>

          <IconButton sx={{ color: "#9ca3af" }}>
            <SettingsIcon />
          </IconButton>

          <IconButton sx={{ color: "#9ca3af" }}>
            <Badge badgeContent={2} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ color: "#9ca3af" }}>
            <HelpOutlineIcon />
          </IconButton>

          <Avatar
            sx={{ width: 32, height: 32, bgcolor: "#374151", fontSize: 14 }}
          >
            US
          </Avatar>

          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            sx={{
              bgcolor: "#3b82f6",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            Customize
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
