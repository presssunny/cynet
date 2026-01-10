// routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const { authMiddleware } = require('../middleware/middleware');

// כל הראוטים עוברים דרך ה-Middleware לאימות
router.use(authMiddleware);

// הגדרת הנתיבים כפי שביקשת
router.get('/alerts', controller.getLatestAlerts);
router.get('/alerts/bulk', controller.getAlertsBulk);
router.get('/alerts/bulkByDateChanged', controller.getAlertsByDateChanged);
router.get('/alerts/count', controller.getAlertCount);

module.exports = router;

