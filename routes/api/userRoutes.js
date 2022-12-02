const router = require('express').Router();

//import controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
} = require('../../controllers/userControllers');

//api/users
router.route('/').get(getUsers).post(createUser);

//api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//api/users/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriend);


module.exports = router;