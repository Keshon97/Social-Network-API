const express = require('express');
const db = require('./config/connection');

//import models
const {Thought, User} = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get route to find all users
app.get('/api/users', (req, res) => {
  User.find({})
  .then((users) => res.json(users))
  .catch((err) => res.status(500).json(err));
});

//post route to create users
app.post('/api/users', (req, res) => {
  User.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json(err));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
