const express = require('express');
const controllers = require("../controllers");
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

/** GET /stock - Filter stock data  */
router.get('/companySearch', controllers.companySearch);
router.post('/timeFrame', controllers.timeFrame);
router.post('/stocksInTime', controllers.stocksInTime);
router.get('/tickerSearch/:symbol', controllers.tickerSearch);

module.exports = router;
