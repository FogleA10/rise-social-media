const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
// /api/comments
router.use('/thoughts', thoughtRoutes);
// /api/users
router.use('/users', userRoutes);


module.exports = router;
