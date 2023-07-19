const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const tripRoutes = require('./trip-routes.js');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/plan-your-trip', tripRoutes);
router.use('/api', apiRoutes);

module.exports = router;
