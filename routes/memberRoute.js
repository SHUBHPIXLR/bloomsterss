const express = require('express');
const { signupMember, loginMember, logoutMember, updateMember, getMemberDetails, getAllMembers, deleteMember } = require('../controllers/memberController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/member/signup').post(signupMember);
router.route('/member/login').post(loginMember);
router.route('/logout').get(logoutMember);
router.route("/member/fetchAll").get(getAllMembers);
// router.route('/member/:id').post(isAuthenticatedUser, getMemberDetails);
router.route('/member/:id').delete(deleteMember);
// router.route('/member/:id').put(isAuthenticatedUser, updateMember);

module.exports = router;