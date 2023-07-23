const router = require('express').Router();

const travellerRoutes = require('./traveller-routes');
const postRoutes = require('./post-routes');
const locationRoutes = require('./location-routes');
const createtripRoutes = require('./createtrip-routes');
const authRoutes = require('./auth-routes');

router.use('/travellers', travellerRoutes);
router.use('/post', postRoutes);
router.use('/locations', locationRoutes);
router.use('/trip', createtripRoutes);
router.use('/auth', authRoutes);

module.exports = router;
