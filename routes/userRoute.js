const express = require('express');
const { registerUser, loginUser, logoutUser, updateUser, updateChild, deleteChild, verifyOtp, getUserDetails, getAllUsers, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/user/signup').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/verifyotp').post(verifyOtp);
router.route('/logout').get(logoutUser);
router.route("/user/fetchAll").get(getAllUsers);
router.route('/user/:id').post(isAuthenticatedUser, getUserDetails);
router.route('/user/:id').delete(deleteUser);
router.route('/user/:id').put(isAuthenticatedUser, updateUser);
router.route('/user/child/:id').put(isAuthenticatedUser, updateChild);
router.route('/user/child/:id').delete(isAuthenticatedUser, deleteChild);

module.exports = router;