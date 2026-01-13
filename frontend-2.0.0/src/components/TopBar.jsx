import React, { useContext, useState, useEffect, useCallback } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import CheckIcon from "@mui/icons-material/Check";

import { ThemeContext } from "../theme/ThemeProviderWrapper";
import { useCompanySwitcher } from "../utils/Settings/useCompanySwitcher";
import { AuthContext } from "../contexts/AuthContext";
import { getCompaniesSelect } from "../api/api";

const TopBarRoot = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "68px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.text.primary, 0.05),
  borderRadius: theme.shape.borderRadius,
  padding: "4px 12px",
  height: "40px",
  transition: theme.transitions.create("background-color"),
  color: theme.palette.text.primary,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
  },
}));

const StyledTextBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
  padding: 0,
  minWidth: "auto",
  fontWeight: 400,
  fontSize: "14px",
  width: "100%",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiButton-endIcon": {
    marginLeft: "8px",
    color: theme.palette.text.secondary,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: "14px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 0),
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

const CustomizeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  padding: "6px 16px",
  height: "40px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "none",
  },
}));

export default function TopBar() {
  const theme = useTheme();

  const { toggleTheme } = useContext(ThemeContext);
  const user = {
    name: "test",
    username: "test",
    role: "test",
    suser: true,
    email: "test@test.com",
  };
  const { switchCompany, switchLoading } = useCompanySwitcher();

  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companyMenuAnchor, setCompanyMenuAnchor] = useState(null);

  const isMenuOpen = Boolean(companyMenuAnchor);

  const handleMenuOpen = (event) => {
    setCompanyMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setCompanyMenuAnchor(null);
  };

  useEffect(() => {
    if (isMenuOpen) {
      setCompaniesLoading(true);

      getCompaniesSelect()
        .then((res) => {
          setCompanies(res || []);
        })
        .catch((err) => {
          console.error("Failed to fetch companies:", err);
          setCompanies([]);
        })
        .finally(() => {
          setCompaniesLoading(false);
        });
    }
  }, [isMenuOpen]);

  const handleCompanySelect = async (companyId) => {
    handleMenuClose();
    if (companyId === user?.companyId) return;

    try {
      await switchCompany(companyId);
    } catch (error) {
      console.error("Failed to switch company", error);
    }
  };

  return (
    <TopBarRoot>
      {/* === LEFT SIDE === */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Company Dropdown */}
        <ActionBox onClick={handleMenuOpen}>
          <StyledTextBtn endIcon={<KeyboardArrowDownIcon />}>
            {/* מציג את שם החברה הנוכחית או טוען... */}
            {switchLoading
              ? "Switching..."
              : user?.companyName || "Select Company"}
          </StyledTextBtn>
        </ActionBox>

        {/* Search Bar */}
        <ActionBox sx={{ width: "300px", cursor: "text" }}>
          <SearchIcon
            sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
          />
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </ActionBox>

        {/* Date Filter (Static for now) */}
        <ActionBox sx={{ ml: 2 }}>
          <StyledTextBtn endIcon={<KeyboardArrowDownIcon />}>
            Last 7 days
          </StyledTextBtn>
        </ActionBox>
      </Box>

      {/* === RIGHT SIDE === */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{ color: theme.palette.text.primary }}
        >
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* Notifications */}
        <IconButton sx={{ color: theme.palette.text.primary }}>
          <Badge
            variant="dot"
            color="primary"
            sx={{
              "& .MuiBadge-badge": { top: 4, right: 3 },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Help */}
        <IconButton sx={{ color: theme.palette.text.primary }}>
          <HelpOutlineIcon />
        </IconButton>

        {/* Profile */}
        <IconButton sx={{ color: theme.palette.text.primary, mr: 1 }}>
          <PersonOutlineIcon />
        </IconButton>

        {/* Customize */}
        <CustomizeButton startIcon={<SettingsIcon />}>
          Customize
        </CustomizeButton>
      </Box>

      {/* === COMPANY SELECTION MENU === */}
      <Menu
        anchorEl={companyMenuAnchor}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            maxHeight: 300,
            borderRadius: 2,
            boxShadow: theme.shadows[3],

            backgroundColor: theme.palette.background.paper,
            backgroundImage: "none",
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{ px: 2, py: 1, color: "text.secondary", display: "block" }}
        >
          Select Organization
        </Typography>
        <Divider />

        {companiesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={20} />
          </Box>
        ) : companies.length > 0 ? (
          companies.map((comp) => {
            const isSelected = user?.companyName === comp.company_name;

            return (
              <MenuItem
                key={comp.company_id}
                onClick={() => handleCompanySelect(comp.company_id)}
                selected={isSelected}
                sx={{
                  justifyContent: "space-between",
                  fontSize: "14px",
                  py: 1.5,
                }}
              >
                {comp.company_name}
                {isSelected && <CheckIcon fontSize="small" color="primary" />}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem disabled>No companies found</MenuItem>
        )}
      </Menu>
    </TopBarRoot>
  );
}
