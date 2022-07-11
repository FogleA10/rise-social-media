const router = require('express').Router();
const commentRoutes = require('./thought-routes');
const pizzaRoutes = require('./user-routes');

router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes);

module.exports = router;
