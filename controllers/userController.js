const User = require('../models/User');

// **`/api/users`**

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```


// * `DELETE` to remove user by its `_id`

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
        } catch (err) {
         res.status(500).json(err);
        }
    },
    async createUser(req,res) {
        try {
            const UserData = await User.create(req.body);
            res.json(UserData);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async updateUser(req,res){
        try {
            const newUserData = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!newUserDate) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
      
            res.json(newUserData);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    async deleteUser(req,res){
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json({ message: 'User successfully deleted!' });
          } catch (err) {
            res.status(500).json(err);
          }
    },
};