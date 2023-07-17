const router = require('express').Router();
const travellerRoutes = require('./traveller-routes');

router.use('/travellers', travellerRoutes);

module.exports = router;
