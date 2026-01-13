import React, { lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";

// --- Hooks & Utils ---

// --- Layouts & Guards ---
import MainLayout from "../components/layout/MainLayout";
import Overview from "../pages/Alerts/Overview";

/* -------------------------------------------------------------------------- */
/*                            Lazy Load Definitions                           */
/* -------------------------------------------------------------------------- */

// Auth
const Login = lazy(() => import("../pages/Login/Login"));
const AuthCallback = lazy(() => import("../AuthCallback"));

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Typography variant="h4" color="primary">
      Loading...
    </Typography>
  </Box>
);

/* -------------------------------------------------------------------------- */
/*                         Components: Coming Soon                            */
/* -------------------------------------------------------------------------- */

const ComingSoon = ({ title }) => (
  <Container maxWidth="md">
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      textAlign="center"
    >
      <Typography
        variant="h3"
        color="primary"
        gutterBottom
        sx={{ fontWeight: "bold", opacity: 0.3 }}
      >
        COMING SOON
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {title || "This module is currently under development."}
      </Typography>
      <Typography variant="body2" color="textDisabled" sx={{ mt: 2 }}>
        Stay tuned for updates.
      </Typography>
    </Box>
  </Container>
);

/* -------------------------------------------------------------------------- */
/*                         Error Boundary (Utility)                           */
/* -------------------------------------------------------------------------- */
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <Box p={4} textAlign="center">
          <Typography color="error">Module Load Failed. Refresh.</Typography>
        </Box>
      );
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*                             Main Application                               */
/* -------------------------------------------------------------------------- */

export const AppRoutes = () => {
  const [user, setUser] = useState({
    username: "demoUser",
    email: "test@test.com",
    role: "admin",
    name: "test",
    suser: true,
  });

  const getHomeRedirect = () =>
    user ? (
      <Navigate to="/devices/overview" replace />
    ) : (
      <Navigate to="/" replace />
    );

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/dashboard"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          <Route element={<MainLayout user={user} />}>
            <Route element={<Outlet />}>
              {/* === Dashboard === */}
              <Route
                path="dashboard"
                element={<ComingSoon title="Main Dashboard" />}
              />

              {/* === Monitoring Group === */}
              <Route path="monitor">
                <Route path="history">
                  <Route
                    index
                    element={<ComingSoon title="Monitor History" />}
                  />
                  <Route
                    path=":hostname"
                    element={<ComingSoon title="Monitor History Details" />}
                  />
                </Route>
              </Route>

              {/* === Infrastructure Group === */}
              <Route path="infrastructure">
                <Route
                  path="overview"
                  element={<ComingSoon title="Infrastructure Overview" />}
                />
                <Route
                  path="cloud"
                  element={<ComingSoon title="Cloud Infrastructure" />}
                />
                s
                <Route
                  path="on-prem"
                  element={<ComingSoon title="On-Premises Infrastructure" />}
                />
              </Route>

              {/* === Alerts & Events Group === */}
              <Route path="alerts">
                <Route
                  path="overview"
                  element={<Overview />}
                />
                <Route
                  path="security"
                  element={<ComingSoon title="Security Alerts" />}
                />
                <Route
                  path="network"
                  element={<ComingSoon title="Network Alerts" />}
                />
                <Route
                  path="system"
                  element={<ComingSoon title="System Alerts" />}
                />
              </Route>

              {/* === Identity & Passwords Group === */}
              <Route path="identity">
                <Route
                  path="overview"
                  element={<ComingSoon title="Identity Overview" />}
                />
                <Route
                  path="identities"
                  element={<ComingSoon title="Identities Management" />}
                />
                <Route
                  path="passwords"
                  element={<ComingSoon title="Password Management" />}
                />
              </Route>

              {/* === Devices Group === */}
              <Route path="devices">
                <Route
                  path="overview"
                  element={<ComingSoon title="Devices Overview" />}
                />
                <Route
                  path="servers"
                  element={<ComingSoon title="Servers" />}
                />
                {/* Fallback to ComingSoon/History for incomplete pages */}
                <Route
                  path="workstations"
                  element={<ComingSoon title="Workstations" />}
                />
                <Route
                  path="hypervisors"
                  element={<ComingSoon title="Hypervisors" />}
                />
                <Route
                  path="laptops"
                  element={<ComingSoon title="Laptops" />}
                />
              </Route>

              <Route path="threat">
                <Route
                  path="overview"
                  element={<ComingSoon title="Threat Overview" />}
                />
                <Route
                  path="external"
                  element={<ComingSoon title="External Attack Surface" />}
                />
                <Route
                  path="intelligence"
                  element={<ComingSoon title="Threat Intelligence" />}
                />
              </Route>

              {/* === E-Mail Group === */}
              <Route path="email">
                <Route
                  path="overview"
                  element={<ComingSoon title="Email Security Overview" />}
                />
                <Route
                  path="reputation"
                  element={<ComingSoon title="Email Reputation" />}
                />
                <Route
                  path="dns-health"
                  element={<ComingSoon title="DNS Health" />}
                />
              </Route>

              {/* === GRC Group === */}
              <Route path="grc">
                <Route
                  path="overview"
                  element={<ComingSoon title="GRC Overview" />}
                />
                <Route
                  path="compliance"
                  element={<ComingSoon title="Compliance" />}
                />
              </Route>

              {/* === Supply Chain Group === */}
              <Route path="supply">
                <Route
                  path="overview"
                  element={<ComingSoon title="Supply Chain Overview" />}
                />
                <Route
                  path="providers"
                  element={<ComingSoon title="Providers" />}
                />
                <Route
                  path="exposed"
                  element={<ComingSoon title="Exposed Data" />}
                />
                <Route
                  path="connectivity"
                  element={<ComingSoon title="Connectivity" />}
                />
              </Route>

              {/* === SSE Group === */}
              <Route path="sse">
                <Route
                  path="overview"
                  element={<ComingSoon title="SSE Overview" />}
                />
                <Route
                  path="access"
                  element={<ComingSoon title="Secure Access" />}
                />
                <Route
                  path="browser"
                  element={<ComingSoon title="Browser Security" />}
                />
                <Route
                  path="extensions"
                  element={<ComingSoon title="Extensions" />}
                />
                <Route
                  path="shadow-saas"
                  element={<ComingSoon title="Shadow SaaS" />}
                />
              </Route>

              {/* === Data Security Group === */}
              <Route path="datasec">
                <Route
                  path="overview"
                  element={<ComingSoon title="Data Security Overview" />}
                />
                <Route
                  path="locations"
                  element={<ComingSoon title="Data Locations" />}
                />
                <Route
                  path="resilience"
                  element={<ComingSoon title="Data Resilience" />}
                />
                <Route
                  path="value"
                  element={<ComingSoon title="Data Value" />}
                />
              </Route>

              {/* === Network Group === */}
              <Route path="network">
                <Route
                  path="overview"
                  element={<ComingSoon title="Network Overview" />}
                />
                <Route
                  path="baseline"
                  element={<ComingSoon title="Network Baseline" />}
                />
                <Route
                  path="anomaly"
                  element={<ComingSoon title="Anomaly Detection" />}
                />
              </Route>

              {/* === Awareness Group === */}
              <Route path="awareness">
                <Route
                  path="overview"
                  element={<ComingSoon title="Awareness Overview" />}
                />
                <Route
                  path="status"
                  element={<ComingSoon title="Campaign Status" />}
                />
                <Route
                  path="trainings"
                  element={<ComingSoon title="Trainings" />}
                />
              </Route>
            </Route>
          </Route>

          {/* 4. FALLBACK */}
          <Route path="*" element={getHomeRedirect()} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
