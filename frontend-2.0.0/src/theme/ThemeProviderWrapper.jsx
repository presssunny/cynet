import { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./index";

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);
  const [currentTheme, setCurrentTheme] = useState(theme(mode));

  useEffect(() => {
    console.log("Updating theme with mode:", mode);
    setCurrentTheme(theme(mode));
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
