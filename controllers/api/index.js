const router = require('express').Router();
const travellerRoutes = require('./traveller-routes');
const postRoutes = require('./post-routes');
const locationRoutes = require('./location-routes');

router.use('/travellers', travellerRoutes);
router.use('/trip', createtripRoutes);
router.use('/post', postRoutes);
router.use('/locations', locationRoutes);
router.use('/trip', createtripRoutes);

module.exports = router;
