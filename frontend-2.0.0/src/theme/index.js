// src/theme/index.js
import { alpha, createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import { listItem, listItemButton } from "./listItem";
import { dialog, themeAnimations } from "./dialog"; // dialog is a function + exports animations
import { CheckedIcon, UncheckedIcon } from "./CheckboxIcons";
// ------------------------------
// Dark palette (unchanged for now)
// ------------------------------
const darkPalette = {
  mode: "dark",
  primary: {
    main: "#1976d2",
  },
  secondary: {
    main: "#dc004e",
  },
  background: {
    default: "#121212",
    dark: "#bfbfbf",
    card: "#181F25",
    paper: "#1e1e1e",
  },
  text: {
    default: "#ffffff",
    primary: "#ffffff",
    secondary: "#b0b0b0",
  },
  inherit: {
    main: "#868C96",
    color: "#0D0D0D",
  },
  error: {
    main: "#FF5252",
  },
  divider: "rgba(255,255,255,0.12)",
};

// ------------------------------
// Light palette (UPDATED to match Figma)
// ------------------------------
const lightPalette = {
  mode: "light",

  // Primary button (primary): #359AFF with white text
  primary: {
    main: "#359AFF",
    contrastText: "#FFFFFF",
  },

  // Use as an additional accent color (also matches your "chip primary" tone usage)
  secondary: {
    main: "#275D92",
    contrastText: "#FFFFFF",
  },

  background: {
    // Full web background: #F3F5F9
    default: "#F3F5F9",
    // Cards / panels
    paper: "#FFFFFF",
    // Keep for compatibility if you use background.dark somewhere
    dark: "#E5E7EB",

    card: "#fff",
  },

  // Main text: #0D0D0D
  text: {
    default: "#0D0D0D",
    primary: "#0D0D0D",
    // Default chip color: #868C96 (also good as secondary text)
    secondary: "#868C96",
  },
  inherit: {
    main: "#868C96",
    color: "#0D0D0D",
  },
  // Borders (default button border too): #D1D5DB
  divider: "#D1D5DB",

  // Chips / statuses from Figma
  error: {
    main: "#FF5252",
    contrastText: "#0D0D0D", // as you described for "chip error"
  },
  warning: {
    main: "#FB923C",
    contrastText: "#FFFFFF",
  },

  // Custom tokens (so you can reference them in components via theme.palette.custom...)
  custom: {
    button: {
      defaultBg: "#FFFFFF",
      defaultText: "#0D0D0D",
      defaultBorder: "#D1D5DB",
    },
    chip: {
      primaryBg: "#275D92",
      primaryText: "#FFFFFF",

      errorBg: "#EF4444",
      errorText: "#0D0D0D",

      warningBg: "#FB923C",
      warningText: "#FFFFFF",

      warningLightBg: "#FACC15",
      warningLightText: "#FFFFFF",

      defaultBg: "#868C96",
      defaultText: "#0D0D0D",

      unSelectedBg: "#F3F5F9",
      unSelectedText: "rgba(13, 13, 13, 0.6)", // #0D0D0D99 (60%)
    },
  },
};

// Create theme by mode
export const theme = (mode) => {
  const palette = mode === "dark" ? darkPalette : lightPalette;

  const typographyStyles = typography(palette);

  const listItemStyles = listItem(palette);
  const listItemButtonStyles = listItemButton(palette);
  // const dialogStyles = dialog(palette);

  return createTheme({
    palette,
    typography: typographyStyles,
    components: {
      // ...dialogStyles,

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.card,
            color: palette.text.primary,
          },
        },
      },

      MuiMenuList: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.card,
            color: palette.text.primary,
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: palette.background.paper,
            color: palette.text.primary,
            "&:focus": {
              backgroundColor: palette.background.paper,
            },
          },
        },
      },

      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            overflow: "hidden", // חייב כדי לחתוך את הפינות
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.card,
            borderRadius: 20,
            overflow: "hidden",
          },
        },
      },

      MuiTable: {
        styleOverrides: {
          root: {
            border: `1px solid ${palette.divider}`,
            // 🔥 קריטי: בלי זה border-radius על th לא ייראה
            borderCollapse: "separate",
            borderSpacing: 0,
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            // צובעים את ה-head דרך התאים, אבל לא מזיק להשאיר פה
            backgroundColor: palette.background.card,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: palette.background.card,
            color: palette.text.primary,

            "&:first-of-type": { borderTopLeftRadius: 20 },
            "&:last-of-type": { borderTopRightRadius: 20 },

            paddingTop: 15,
            paddingBottom: 15,
            // אל תשים height בכלל
          },

          body: {
            paddingTop: 14,
            paddingBottom: 14,
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: palette.background.card,
            color: palette.text.primary,
            zIndex: 90,
            border: `1px solid ${palette.divider}`,
            boxShadow:
              mode === "dark"
                ? "0 8px 24px rgba(0,0,0,0.35)"
                : "0 8px 24px rgba(0,0,0,0.12)",
            "& .MuiTooltip-arrow": {
              color: palette.background.paper,
            },
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: palette.divider,
          },
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.08)",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.card,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            "&.MuiButton-outlined": {
              borderColor: palette.divider,
              color: palette.text.default,
              borderRadius: "15px",
              backgroundColor: "unset",
              "&:hover": {
                borderColor: palette.primary.main,
                backgroundColor: alpha(palette.primary.main, 0.08),
              },
            },
          },
        },
      },
      MuiCheckbox: {
        // 1. שינוי האייקונים עצמם כדי לשלוט ב-Border Radius של הקוביה
        defaultProps: {
          disableRipple: true,
          icon: UncheckedIcon, // שימוש במשתנה המיובא (בלי סוגריים משולשים)
          checkedIcon: CheckedIcon, // שימוש במשתנה המיובא
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // Light mode borders should feel like #D1D5DB
            ...(mode === "light"
              ? {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.divider,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.primary.main,
                  },
                }
              : {}),
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {},
      },

      MuiInput: {
        styleOverrides: {},
      },

      MuiInputLabel: {
        styleOverrides: {},
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            // אופציונלי: מגדיר את הרדיוס לרמת העוטף החיצוני אם הרקע מוגדר עליו
            borderRadius: "15px",

            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              overflow: "hidden", // <--- זו השורה החשובה! חותכת את הרקע לפי הרדיוס
            },
            "& .MuiFilledInput-root": {
              borderRadius: "15px",
              overflow: "hidden", // כנ"ל ל-Filled
              borderTopLeftRadius: "15px", // ב-Filled ברירת המחדל היא רק למעלה, דורס את זה
              borderTopRightRadius: "15px",
            },
            "& .MuiInput-root": {
              borderRadius: "15px",
              overflow: "hidden",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: listItemStyles.root,
          selected: listItemStyles.selected,
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: { ...listItemStyles.button, ...listItemButtonStyles.root },
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: listItemStyles.icon,
        },
      },

      MuiListItemText: {
        styleOverrides: {
          root: listItemStyles.text,
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            color: palette.text.primary,
            "&.Mui-selected": {
              color: palette.primary.main,
            },
          },
        },
      },
    },
    animations: themeAnimations,
  });
};

export default theme;
