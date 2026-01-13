export const button = (palette) => ({
  root: {
    textTransform: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "all 0.3s ease-in-out",
  },
  contained: {
    boxShadow: "none",
    ...(palette.mode === "dark"
      ? {
          // הגדרות למצב כהה (כפי שהיו במקור)
          color: "#fff",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
          "&:disabled": {
            color: "#fff",
          },
        }
      : {
          // הגדרות למצב לבן – שימוש בערכי ה-palette מהגדרות lightPalette
          color: palette.primary.contrastText,
          backgroundColor: palette.primary.main,
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: palette.primary.dark,
          },
          "&:disabled": {
            color: palette.primary.contrastText,
            backgroundColor: "#bdbdbd",
          },
        }),
  },
  outlined: {
    borderWidth: "2px",

    ...(palette.mode === "dark"
      ? {
          // הגדרות למצב כהה (כפי שהיו במקור)
          borderColor: "#1976d2",
          color: "#1976d2",
          "&:hover": {
            borderColor: "#1565c0",
          },
          "&:active": {
            borderColor: "#0d47a1",
          },
          "&:disabled": {
            borderColor: "#bdbdbd",
            color: "#bdbdbd",
          },
        }
      : {
          // הגדרות למצב לבן – שימוש בערכי ה-palette מהגדרות lightPalette
          borderColor: palette.primary.main,
          color: palette.primary.main,
          "&:hover": {
            borderColor: palette.primary.dark,
          },
          "&:active": {
            borderColor: palette.primary.dark,
          },
          "&:disabled": {
            borderColor: "#bdbdbd",
            color: "#bdbdbd",
          },
        }),
  },
  text: {
    ...(palette.mode === "dark"
      ? {
          // הגדרות למצב כהה
          color: "#1976d2",
          "&:active": {
            color: "#0d47a1",
          },
          "&:disabled": {
            color: "#bdbdbd",
          },
        }
      : {
          // הגדרות למצב לבן
          color: palette.primary.main,
          "&:active": {
            color: palette.primary.dark,
          },
          "&:disabled": {
            color: "#bdbdbd",
          },
        }),
  },
});
