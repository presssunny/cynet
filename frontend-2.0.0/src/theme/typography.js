export const typography = (palette) => ({
  fontFamily: '"Poppins", sans-serif',
  h1: {
    fontSize: "2rem",
    fontWeight: 500,
  },
  // שימוש בצבעי הטקסט מה-palette
  text: {
    primary: {
      color: palette.text.primary,
    },
  },
});
