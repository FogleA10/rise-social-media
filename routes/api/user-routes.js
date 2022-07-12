const router = require('express').Router();
const { User } = require('../../models');
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteAFriend,
  deleteUser,
  addAFriend
} = require('../../controllers/user-controller');


router
  .route('/:userId/friends/:friendId')
  .post(addAFriend)
  .delete(deleteAFriend);

// /api/pizzas
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);



module.exports = router;
// user