const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thouhgts/:thouhgtsId/reactions
router.route('/:thoughtsId/reactions').post(addThoughtReaction);

// api/thoughts/:thoughtsId/reactions/reactionId
router.route('/:thoughtsId/reactions/:reactionId').delete(removeThoughtReaction);