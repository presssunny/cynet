// src/theme/dialog.js
export const dialog = (palette) => ({
  /* ---------- Dialog ---------- */
  MuiDialog: {
    styleOverrides: {
      root: {
        zIndex: 10000,
      },
      paper: {
        border:
          palette.mode === "dark" ? "1px solid #1a4a5a" : "1px solid #ccc",
        borderRadius: 8,
        backgroundImage:
          palette.mode === "dark"
            ? "linear-gradient(45deg, rgb(20, 28, 32), #0d1215)"
            : "linear-gradient(45deg, #ffffff, #f0f0f0)",
        boxShadow:
          palette.mode === "dark"
            ? `
              0 0 30px rgba(0, 163, 255, 0.2),
              inset 0 0 15px rgba(0, 98, 255, 0.1)
            `
            : `
              0 0 30px rgba(0, 0, 0, 0.1),
              inset 0 0 15px rgba(0, 0, 0, 0.05)
            `,
        position: "relative",
        color: palette.text.primary,
      },
    },
  },

  /* ---------- Backdrop (הרקע שמאחורי הדיאלוג) ---------- */
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        backgroundColor:
          palette.mode === "dark"
            ? "rgba(17,25,33,0.55)"
            : "rgba(255,255,255,0.55)",
        /* שמור על z-index נמוך יותר מה-Dialog עצמו */
        zIndex: 9999,
      },
    },
  },
});
export const themeAnimations = {
  "@keyframes subtle-glow": {
    "0%, 100%": { opacity: 0.8 },
    "50%": { opacity: 1 },
  },
};
