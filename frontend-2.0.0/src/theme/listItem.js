// src/theme/listItem.js

export const listItem = (palette) => ({
  // סגנונות כלליים ל-ListItem
  root: {
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: palette.mode === "dark" ? "#333" : "#f0f0f0",
    },
  },

  // סגנונות כאשר ה-ListItem במצב selected (ניתן להרחיב לפי הצורך)
  selected: {
    // דוגמה: (ניתן להתאים לפי הטעם)
    // backgroundColor: palette.mode === "dark" ? "#555" : "#e0e0e0",
    // color: palette.mode === "dark" ? "#fff" : palette.text.primary,
  },

  // סגנונות עבור ListItemButton – כאן ניתן להוסיף או לשנות ערכים במידת הצורך
  button: {
    // ניתן להוסיף סגנונות דינמיים בעתיד
  },

  // סגנונות עבור ListItemIcon – ניתן להתאים את הצבע לפי מצב העיצוב
  icon: {
    // דוגמה:
    // color: palette.mode === "dark" ? "#fff" : palette.text.primary,
  },

  // סגנונות עבור ListItemText – ניתן להתאים את הצבע או גודל הטקסט
  text: {
    // דוגמה:
    // color: palette.mode === "dark" ? "#fff" : palette.text.primary,
    // fontSize: "14px",
  },
});

export const listItemButton = (palette) => ({
  root: {
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor:
        palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
      transform: "translateX(2px)",
    },
    "&.Mui-selected": {
      background:
        palette.mode === "dark"
          ? "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"
          : "linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.02))",
      boxShadow:
        palette.mode === "dark"
          ? "inset 2px 0 0 0 #90caf9"
          : `inset 2px 0 0 0 ${palette.primary.main}`,
      "&:hover": {
        backgroundColor:
          palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        transform: "translateX(4px)",
      },
      "& .MuiListItemIcon-root": {
        color: palette.mode === "dark" ? "#90caf9" : palette.primary.main,
      },
      "& .MuiListItemText-root": {
        color: palette.mode === "dark" ? "#90caf9" : palette.primary.main,
        fontWeight: 600,
        textShadow:
          palette.mode === "dark"
            ? "1px 1px 2px rgba(255, 255, 255, 0.23)"
            : "none",
      },
    },
  },
});
