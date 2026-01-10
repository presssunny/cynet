// middleware/middleware.js

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const clientId = req.headers['client_id'];

    // בדיקה בסיסית אם הטוקן וה-Client ID קיימים
    // ב-Mock אנו לא מאמתים את הטוקן מול DB אמיתי, רק מוודאים שהוא נשלח
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Missing or invalid Authorization header (Bearer token required)" });
    }

    if (!clientId) {
        return res.status(400).json({ error: "Missing client_id header" });
    }

    // הכל תקין, ממשיכים לקונטרולר
    console.log(`[Request] ${req.method} ${req.originalUrl} - ClientID: ${clientId}`);
    next();
};

module.exports = {
    authMiddleware
};