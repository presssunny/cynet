import { useState, useContext } from "react";
import { switchCompany, resetCompany, authToken } from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";

export const useCompanySwitcher = () => {
  // const { setUser, setAuthLoading, triggerRefetch } = useContext(AuthContext);

  let user = {
    name: "test",
    username: "test",
    role: "test",
    suser: true,
    email: "test@test.com",
  };

  const [authLoading, setAuthLoading] = useState(false);
  const triggerRefetch = () => {
    return;
  };
  const [switchLoading, setSwitchLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const updateAuthContextAndRefetch = async (tokenResponse) => {
    const newToken = tokenResponse.token;
    localStorage.setItem("token", newToken);
    setAuthLoading(true);
    try {
      const data = await authToken(newToken);
      if (data?.valid) {
        setUser({
          username: data.username,
          email: data.email,
          role: data.role,
          companyName: data.companyName || null,
        });

        triggerRefetch();
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setNotification({
          message: "Authentication failed, please log in again.",
          severity: "error",
        });
      }
    } catch (authError) {
      console.error("Auth token validation failed:", authError);
      localStorage.removeItem("token");
      setUser(null);
      setNotification({
        message: "Authentication error, please log in again.",
        severity: "error",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSwitchCompany = async (id) => {
    setSwitchLoading(true);
    setNotification(null);
    try {
      const tokenResponse = await switchCompany(id);

      await updateAuthContextAndRefetch(tokenResponse);
      setNotification({
        message: "Company switched successfully!",
        severity: "success",
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to switch company.";
      setNotification({ message: errorMessage, severity: "error" });
      throw error;
    } finally {
      setSwitchLoading(false);
    }
  };

  const handleResetCompanyView = async () => {
    setSwitchLoading(true);
    setNotification(null);
    try {
      const tokenResponse = await resetCompany();

      await updateAuthContextAndRefetch(tokenResponse);
      setNotification({
        message: "View reset successfully!",
        severity: "success",
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to reset view.";
      setNotification({ message: errorMessage, severity: "error" });
    } finally {
      setSwitchLoading(false);
    }
  };

  return {
    switchCompany: handleSwitchCompany,
    resetCompanyView: handleResetCompanyView,
    switchLoading,
    notification,
    clearNotification: () => setNotification(null),
  };
};
