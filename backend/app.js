// app.js
const express = require("express");
const cors = require("cors");

const app = express();

// הגדרות כלליות
app.use(cors());

// שימוש ב-Express המובנה (מחליף את body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// שימוש בראוטים תחת הפרפיקס /api

// טיפול בשגיאות כלליות (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

module.exports = app;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
