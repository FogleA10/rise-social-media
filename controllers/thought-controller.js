const { Thought,User } = require('../models');


const thoughtController = {
    getAllThought(req, res) {
      Thought.find({})
        .populate({
            path: 'comments',
            select: '-__v'
        })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },
    getSingleThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData=>{
        return User.findOneAndUpdate(
          {_id:req.body.userId},
          {$push:{thoughts:dbThoughtData._id}},
          {new:true}

        )
      })

      .then(dbUserData => {res.json(dbUserData)})
      .catch(err => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
  addAReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thougth found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));

},
deleteAReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: {reactionId: params.friendId} } }, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
}






};
module.exports = thoughtController;