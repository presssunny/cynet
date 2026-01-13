import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TopBar from "../TopBar";
import SideMenu from "../SideMenu";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SideMenu open={open} setOpen={setOpen} />

      <main
        style={{
          flexGrow: 1,
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.default,
          overflow: "hidden",
        }}
      >
        <TopBar />

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </main>
    </div>
  );
};

export default MainLayout;
