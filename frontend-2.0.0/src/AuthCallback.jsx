import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authToken } from "./api/api";

function AuthCallback({ setUser, setAuthLoading }) {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await authToken();
      return response;
    } catch (error) {
      console.error("Verify token error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      verifyToken(token)
        .then((data) => {
          localStorage.setItem("token", token);

          setUser({
            username: data.username,
            email: data.email,
            role: data.role,
          });

          setAuthLoading(false);
          setIsLoading(false);

          navigate("/");
        })
        .catch((err) => {
          console.error(err);

          localStorage.removeItem("token");
          setUser(null);
          setAuthLoading(false);
          setIsLoading(false);
          navigate("/login");
        });
    } else {
      setIsLoading(false);
      setAuthLoading(false);
      navigate("/login");
    }
  }, [token, navigate, setUser, setAuthLoading]);

  if (isLoading) {
    return <div></div>;
  }

  return null;
}

export default AuthCallback;
