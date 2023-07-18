const router = require('express').Router();
const travellerRoutes = require('./traveller-routes');
const postRoutes = require('./post-routes');

router.use('/travellers', travellerRoutes);
router.use('/post', postRoutes);

module.exports = router;
