import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProviderWrapper } from "./theme/ThemeProviderWrapper.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";

const queryClient = new QueryClient({
  // Set default options for queries
  // to optimize performance and reduce unnecessary refetches
  // Adjust staleTime and cacheTime as needed
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 15 * 60 * 1000, // 15 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnReconnect: false, // Disable refetch on reconnect
      refetchOnMount: false, // Disable refetch on mount
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <CssBaseline />
        <App />
      </ThemeProviderWrapper>
    </QueryClientProvider>
  </StrictMode>
);
