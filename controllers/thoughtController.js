const { Thoughts, User } = require('../models');

// **`/api/thoughts`**


// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```

// **`/api/thoughts/:thoughtId/reactions`**


module.exports = {
    async getThoughts(re, res) {
        try {
         const thoughts = await Thoughts.find();
         res.json(thouhgts);   
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req,res) {
        try {
         const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId})

         if(!thoughts) {
            return res.status(404).json({ message: 'No thought with that ID' });
         }
         res,json(thoughts);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughts = await Thoughts.create(req.body);
            const user = await User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thoughts._id } },
              { new: true }
            );
      
            if (!user) {
              return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              });
            }
      
            res.json('Created the thought');
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
              { _id: req.params.thoughtsId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
      
            res.json(thought);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
      
            const user = await User.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thoughts: req.params.thoughtsId } },
              { new: true }
            );
      
            if (!user) {
              return res
                .status(404)
                .json({ message: 'Thought deleted but no user with this id!' });
            }
      
            res.json({ message: 'Thought successfully deleted!' });
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
              { _id: req.params.thoughtsId },
              { $addToSet: { reactions: req.body } },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async removeThoughtReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
              { _id: req.params.thoughtsId },
              { $pull: { reactions: { reactionId: req.params.reactionId } } },
              { runValidators: true, new: true }
            )
      
            if (!thought) {
              return res.status(404).json({ message: 'No video with this id!' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },

};