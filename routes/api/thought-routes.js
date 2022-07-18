const router = require('express').Router();
const {
  getAllThought,
  getSingleThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addAReaction,
  deleteAReaction
} = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/').get(getAllThought).post(createThought);


// /api/comments/<pizzaId>/<commentId>
router
  .route('/:thoughtId')
  .get(getSingleThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:thoughtId/reactions').post(addAReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteAReaction);

module.exports = router;
// thought