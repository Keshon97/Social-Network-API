const {User, Thought} = require ('../models');

module.exports = {
    //get route to retrieve all users
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //get route to retrieve a single user by id
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that Id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));   
    },

    //post route to create a user
    createUser(req, res) {
        User.create(req.body) 
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //deletes user by id
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that Id' })
                : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //put request to update existing users
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, req.body, 
            //returns updated user instead of the original user
            {new: true})
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that Id' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));  
    },
    //adds a friend to an existing user
    createFriend(req, res) {
         return User.findOneAndUpdate(
            //user that will add friend,
            {_id: req.params.userId},
            //the friend being added, added by id, adds friend virtual to array
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
            )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that Id' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};