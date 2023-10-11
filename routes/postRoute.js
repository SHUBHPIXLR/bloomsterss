const express = require('express');
const { createPost, getPostDetails, likePost, unlikePost, commentPost, getAllPosts, deletePost } = require('../controllers/postController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/post/create').post(createPost);
router.route("/post/fetchAll").get(getAllPosts);
router.route("/post/like").put(likePost);
router.route("/post/unlike").put(unlikePost);
router.route("/post/comment").put(commentPost);
router.route('/post/:id').get(getPostDetails);
// router.route('/post/:id').post(isAuthenticatedUser, getPostDetails);
router.route('/post/:id').delete(deletePost);

module.exports = router;