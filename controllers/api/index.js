const router = require('express').Router();
const travellerRoutes = require('./traveller-routes');
const createtripRoutes = require('./createtrip-routes');
const postRoutes = require('./post-routes');

router.use('/travellers', travellerRoutes);
router.use('/trip', createtripRoutes);
router.use('/post', postRoutes);

module.exports = router;
