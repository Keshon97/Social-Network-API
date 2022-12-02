const router = require('express').Router();

const {
    getThought,
    createThought,
    updateThought,
    getSingleThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;