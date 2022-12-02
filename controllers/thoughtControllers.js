const {Thought, User} = require ('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body) 
            .then((thought_id) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thought: thought_id}},
                    {new: true}
                )
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that Id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));   
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, 
            //returns updated thought instead of the original thought
            {new: true})
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that Id' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));  
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No user with that Id' })
                : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    return Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
      
        {new: true}
    )
  }
};