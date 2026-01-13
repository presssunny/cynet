import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { authToken } from "../api/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [dataKey, setDataKey] = useState(0);

  useEffect(() => {
    const checkToken = async () => {

      try {
        if (false) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
            setUser({
              username: "data.username",
              email: "data.email",
              role: "data.role",
              companyName: "data?.companyName || null",
            });
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkToken();
  }, []);

  const triggerRefetch = useCallback(() => {
    setDataKey((prevKey) => prevKey + 1);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      authLoading,
      setAuthLoading,
      dataKey,
      triggerRefetch,
    }),
    [user, authLoading, dataKey]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
