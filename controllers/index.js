const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const auth = require('./auth');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/auth', auth);

module.exports = router;
