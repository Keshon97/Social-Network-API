const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

router.use((req, res) => {
    res.status(404).send("Wrong Route!");
  });

module.exports = router;