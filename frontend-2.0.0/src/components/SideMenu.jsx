import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  DarkMode,
  LightModeOutlined,
  Logout,
  Pages,
  Dashboard as DashboardIcon,
  NotificationsActive,
  Email,
  Gavel,
  Campaign,
} from "@mui/icons-material";

import {
  FaNetworkWired,
  FaServer,
  FaUserLock,
  FaShieldAlt,
  FaLink,
  FaDatabase,
} from "react-icons/fa";
import { MdSecurity, MdDevices } from "react-icons/md";

import PortalLogo from "../assets/ItGuruLogo.png";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../theme/ThemeProviderWrapper";
import { useCompanySwitcher } from "../utils/Settings/useCompanySwitcher";
import { getCompaniesSelect, logout } from "../api/api";

const DRAWER_WIDTH = 260;
const CLOSED_DRAWER_WIDTH = 70;

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    borderRadius: "unset",
  }),
  borderRadius: "unset",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    borderRadius: "unset",
  }),
  borderRadius: "unset",
  overflowX: "hidden",
  width: `${CLOSED_DRAWER_WIDTH}px`,
  [theme.breakpoints.up("sm")]: {
    width: `${CLOSED_DRAWER_WIDTH}px`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  borderRadius: "unset",
  height: "60px",
  minHeight: "67px",
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  borderRadius: "unset",
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
  }),

  "& .MuiDrawer-paper": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.default
        : theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    ...(open && openedMixin(theme)),
    ...(!open && closedMixin(theme)),
  },
}));

const menuItems = [
  {
    id: "dashboards",
    primary: "Dashboards",
    icon: <DashboardIcon sx={{ fontSize: 20 }} />,
    url: "dashboard",
  },
  {
    id: "infrastructure",
    primary: "Infrastructure",
    icon: <FaServer size={18} />,
    children: [
      { primary: "Overview", url: "infrastructure/overview" },
      { primary: "Cloud", url: "infrastructure/cloud" },
      { primary: "On Perm", url: "infrastructure/on-prem" },
    ],
  },
  {
    id: "alerts",
    primary: "Alerts and Events",
    icon: <NotificationsActive sx={{ fontSize: 20 }} />,
    children: [
      { primary: "Overview", url: "alerts/overview" },
      { primary: "Security", url: "alerts/security" },
      { primary: "Network", url: "alerts/network" },
      { primary: "System", url: "alerts/system" },
    ],
  },
  {
    id: "identity",
    primary: "Identity & Passwords",
    icon: <FaUserLock size={18} />,
    children: [
      { primary: "Overview", url: "identity/overview" },
      { primary: "Identities", url: "identity/identities" },
      { primary: "Passwords", url: "identity/passwords" },
    ],
  },
  {
    id: "devices",
    primary: "Devices",
    icon: <MdDevices size={20} />,
    children: [
      { primary: "Overview", url: "devices/overview" },
      { primary: "Servers", url: "devices/servers" },
      { primary: "Workstations", url: "devices/workstations" },
      { primary: "Hypervisors", url: "devices/hypervisors" },
      { primary: "Laptops", url: "devices/laptops" },
    ],
  },
  {
    id: "threat",
    primary: "Threat Intelligence",
    icon: <FaShieldAlt size={18} />,
    children: [
      { primary: "Overview", url: "threat/overview" },
      { primary: "External Surface Attack", url: "threat/external" },
      { primary: "Intelligence", url: "threat/intelligence" },
    ],
  },
  {
    id: "email",
    primary: "E-Mail",
    icon: <Email sx={{ fontSize: 20 }} />,
    children: [
      { primary: "Overview", url: "email/overview" },
      { primary: "Reputation", url: "email/reputation" },
      { primary: "DNS Health", url: "email/dns-health" },
    ],
  },
  {
    id: "grc",
    primary: "GRC",
    icon: <Gavel sx={{ fontSize: 20 }} />,
    children: [
      { primary: "Overview", url: "grc/overview" },
      { primary: "Compliance", url: "grc/compliance" },
    ],
  },
  {
    id: "supply",
    primary: "Supply Chain",
    icon: <FaLink size={18} />,
    children: [
      { primary: "Overview", url: "supply/overview" },
      { primary: "Providers", url: "supply/providers" },
      { primary: "Exposed Data", url: "supply/exposed" },
      { primary: "Connectivity", url: "supply/connectivity" },
    ],
  },
  {
    id: "sse",
    primary: "SSE",
    icon: <MdSecurity size={20} />,
    children: [
      { primary: "Overview", url: "sse/overview" },
      { primary: "Secure Access", url: "sse/access" },
      { primary: "Browser Security", url: "sse/browser" },
      { primary: "Extensions", url: "sse/extensions" },
      { primary: "Shadow SaaS", url: "sse/shadow-saas" },
    ],
  },
  {
    id: "data_sec",
    primary: "Data Security",
    icon: <FaDatabase size={18} />,
    children: [
      { primary: "Overview", url: "datasec/overview" },
      { primary: "Locations", url: "datasec/locations" },
      { primary: "Resilience", url: "datasec/resilience" },
      { primary: "Value", url: "datasec/value" },
    ],
  },
  {
    id: "network",
    primary: "Network",
    icon: <FaNetworkWired size={18} />,
    children: [
      { primary: "Overview", url: "network/overview" },
      { primary: "Baseline", url: "network/baseline" },
      { primary: "Anomaly", url: "network/anomaly" },
    ],
  },
  {
    id: "awareness",
    primary: "Awareness & Campaigns",
    icon: <Campaign sx={{ fontSize: 20 }} />,
    children: [
      { primary: "Overview", url: "awareness/overview" },
      { primary: "Status", url: "awareness/status" },
      { primary: "Trainings", url: "awareness/trainings" },
    ],
  },
];

export default function SideMenu({ open, setOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = React.useState({
    username: "demoUser",
    email: "test@test.com",
    role: "admin",
    name: "test",
    suser: true,
  });

  const { toggleTheme } = React.useContext(ThemeContext);
  const { switchCompany } = useCompanySwitcher();

  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const [companyMenuAnchor, setCompanyMenuAnchor] = React.useState(null);
  const [companies, setCompanies] = React.useState([]);
  const [openSubMenus, setOpenSubMenus] = React.useState({});

  const isUserMenuOpen = Boolean(userMenuAnchor);
  const isCompanyMenuOpen = Boolean(companyMenuAnchor);

  React.useEffect(() => {
    if (isCompanyMenuOpen) {
      getCompaniesSelect()
        .then((res) => setCompanies(res || []))
        .catch((err) => {
          console.error("Failed to fetch companies:", err);
          setCompanies([]);
        });
    }
  }, [isCompanyMenuOpen]);

  const handleDrawerToogle = () => setOpen(!open);
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  const handleCompanyMenuClose = () => setCompanyMenuAnchor(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    handleUserMenuClose();
  };

  const handleCompanySelect = async (companyId) => {
    try {
      await switchCompany(companyId);
    } catch (error) {
      console.error("Failed to switch company:", error);
    }
    handleCompanyMenuClose();
  };

  const handleNavigation = (url) => {
    navigate(`/${url}`);
  };

  const handleSubMenuClick = (id) => {
    if (!open) {
      setOpen(true);
      setOpenSubMenus((prev) => ({ ...prev, [id]: true }));
    } else {
      setOpenSubMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  return (
    <Box sx={{ display: "flex", zIndex: 1200 }}>
      <StyledDrawer variant="permanent" open={open}>
        {/* === HEADER (LOGO) === */}
        <DrawerHeader>
          {open && (
            <Box
              component="img"
              src={PortalLogo}
              alt="IT-GURU"
              sx={{
                height: "50px",
                objectFit: "contain",

                filter: "var(--logo-filter)",
              }}
            />
          )}
          <IconButton
            onClick={handleDrawerToogle}
            sx={{ ml: open ? 0 : "auto", mr: open ? 0 : "auto" }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />

        {/* === MENU LIST === */}
        <List
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            pt: 2,
            pb: 2,

            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.action.hover,
              borderRadius: "4px",
            },
          }}
        >
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isMenuOpen = openSubMenus[item.id];

            const isChildActive =
              hasChildren &&
              item.children.some((child) =>
                location.pathname.startsWith(`/${child.url}`)
              );
            const isSelfActive =
              !hasChildren && location.pathname.startsWith(`/${item.url}`);
            const isActive = isSelfActive || (isChildActive && !isMenuOpen);

            return (
              <React.Fragment key={item.id}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <Tooltip
                    title={!open ? item.primary : ""}
                    placement="right"
                    arrow
                  >
                    <ListItemButton
                      selected={isActive}
                      onClick={() =>
                        hasChildren
                          ? handleSubMenuClick(item.id)
                          : handleNavigation(item.url)
                      }
                      sx={{
                        minHeight: 44,
                        px: 2.5,
                        justifyContent: open ? "initial" : "center",
                        color: isActive
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                        "&.Mui-selected": {
                          backgroundColor: "transparent",
                          color: theme.palette.text.primary,
                          "& .MuiListItemIcon-root": {
                            color: theme.palette.text.primary,
                          },
                        },
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                          color: isActive
                            ? theme.palette.text.primary
                            : theme.palette.text.secondary,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.primary}
                        primaryTypographyProps={{
                          fontSize: "13px",
                          fontWeight: 500,
                          lineHeight: "120%",
                        }}
                        sx={{ opacity: open ? 1 : 0 }}
                      />

                      {open &&
                        hasChildren &&
                        (isMenuOpen ? (
                          <ExpandLess sx={{ fontSize: 16, opacity: 0.6 }} />
                        ) : (
                          <ExpandMore sx={{ fontSize: 16, opacity: 0.6 }} />
                        ))}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>

                {/* === SUB MENU (TREE VIEW) === */}
                {hasChildren && (
                  <Collapse
                    in={open && isMenuOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        position: "relative",
                        ml: "42px",
                        pl: 2,
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        my: 0.5,
                      }}
                    >
                      {item.children.map((child) => {
                        const isChildSelected = location.pathname.startsWith(
                          `/${child.url}`
                        );
                        return (
                          <ListItemButton
                            key={child.primary}
                            onClick={() => handleNavigation(child.url)}
                            sx={{
                              height: 32,
                              pl: 1,
                              borderRadius: 1,
                            }}
                          >
                            <ListItemText
                              primary={child.primary}
                              primaryTypographyProps={{
                                fontSize: "13px",
                                fontWeight: 400,
                                color: isChildSelected
                                  ? theme.palette.text.primary
                                  : theme.palette.text.secondary,
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />

        {/* === USER PROFILE SECTION === */}
        <Box sx={{ p: 2 }}>
          <Tooltip title={!open ? "User Menu" : ""} placement="right" arrow>
            <Box
              onClick={handleUserMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: open ? "flex-start" : "center",
                cursor: "pointer",
                borderRadius: 1,
                p: open ? 1 : 0,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <Avatar
                src={PortalLogo}
                alt={user?.username}
                sx={{ width: 32, height: 32 }}
              />
              {open && (
                <Box sx={{ ml: 1.5, overflow: "hidden" }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {user?.username || "Guest User"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ fontSize: "11px" }}
                  >
                    {user?.companyName || "No Company"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Tooltip>
        </Box>
      </StyledDrawer>

      {/* === POPUP MENUS === */}
      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          sx: {
            minWidth: 240,
            borderRadius: 2,
            p: 1,
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined fontSize="small" />
            ) : (
              <DarkMode fontSize="small" />
            )}
          </ListItemIcon>
          {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/mock");
            handleUserMenuClose();
          }}
        >
          <ListItemIcon>
            <Pages fontSize="small" />
          </ListItemIcon>
          Mock Pages
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Company Menu */}
      <Menu
        anchorEl={companyMenuAnchor}
        open={isCompanyMenuOpen}
        onClose={handleCompanyMenuClose}
        PaperProps={{ sx: { maxHeight: 300, width: 250, borderRadius: 2 } }}
      >
        <MenuItem dense disabled>
          <Typography variant="caption" color="text.secondary">
            Select Company
          </Typography>
        </MenuItem>
        <Divider />
        {companies.length > 0 ? (
          companies.map((company) => (
            <MenuItem
              key={company.company_id}
              onClick={() => handleCompanySelect(company.company_id)}
            >
              {company.company_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No companies available</MenuItem>
        )}
      </Menu>
    </Box>
  );
}
