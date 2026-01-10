// controller/controller.js
const { alertsList } = require('../mockdata');

// פונקציית עזר לחישוב הזמן הנוכחי ל-SyncTimeUtc
const getSyncTime = () => new Date().toISOString();

// 1. Get Latest Alerts
// GET /api/alerts
exports.getLatestAlerts = (req, res) => {
    // בדוגמה המקורית לא הייתה פגינציה, אלא החזרה של רשימה
    const response = {
        SyncTimeUtc: getSyncTime(),
        Entities: alertsList.slice(0, 10) // מחזיר דוגמא של 10 ראשונים כברירת מחדל
    };
    res.json(response);
};

// 2. Get Alerts with Pagination
// GET /api/alerts/bulk
exports.getAlertsBulk = (req, res) => {
    let limit = parseInt(req.query.Limit) || 10;
    let offset = parseInt(req.query.Offset) || 0;
    
    // שליפת הנתונים לפי ה-Offset וה-Limit
    const paginatedAlerts = alertsList.slice(offset, offset + limit);

    const response = {
        SyncTimeUtc: getSyncTime(),
        Entities: paginatedAlerts
    };
    res.json(response);
};

// 3. Get Alerts by Status Change Date
// GET /api/alerts/bulkByDateChanged
exports.getAlertsByDateChanged = (req, res) => {
    // במוק זה אנחנו מחזירים תוצאות דומות ל-Bulk אבל מדמים לוגיקה של תאריך
    // DateChanged הוא חובה לפי הדוקומנטציה, אך במוק נתעלם אם הוא חסר כדי לא לשבור
    
    let limit = parseInt(req.query.Limit) || 10;
    let offset = parseInt(req.query.Offset) || 0;
    const dateChanged = req.query.DateChanged; 

    // ב-Mock נחזיר פשוט את הרשימה עם פגינציה
    const paginatedAlerts = alertsList.slice(offset, offset + limit);

    const response = {
        SyncTimeUtc: getSyncTime(),
        Entities: paginatedAlerts
    };
    res.json(response);
};

// 4. Get Alert Count
// GET /api/alerts/count
exports.getAlertCount = (req, res) => {
    // הבקשה מבקשת ספירה לפי DateChanged
    // התשובה בדוקומנטציה היא רק מספר (Int32) בגוף התשובה
    
    const count = alertsList.length; // או כל מספר מוק אחר, למשל 150
    
    // החזרת מספר בלבד כ-JSON חוקי
    res.status(200).json(count);
};