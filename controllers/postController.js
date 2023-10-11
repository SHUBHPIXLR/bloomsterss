const Post = require('../models/postModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

// Create Post
exports.createPost = asyncErrorHandler(async (req, res, next) => {
    const newPost = req.body;
    const post = await Post.create(newPost);
    return res.status(200).json({
        status: true,
        message: "Post Created Successfully",
        data: post
    })
});

// Get All Posts --ADMIN
exports.getAllPosts = asyncErrorHandler(async (req, res, next) => {

    const posts = await Post.find();

    return res.status(200).json({
        status: true,
        message: "All Posts Fetched Successfully",
        data: posts
    });
});

// Get Post Details
exports.getPostDetails = asyncErrorHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id).populate("likes", "_id firstname lastname relation").populate("comments.postedBy", "_id firstname lastname relation");

    if (!post) {
        return res.status(404).json({
            status: false,
            message: "Post Not Found",
            data: null
        })
    }

    return res.status(200).json({
        status: true,
        message: "Post Fetch Successfully",
        data: post
    })

});

exports.likePost = asyncErrorHandler(async (req, res, next) => {

    const { memberId, postId } = req.body

    if (!memberId) {
        return res.status(404).json({
            status: false,
            message: "Member Not Found",
            data: null
        })
    }
    if (!postId) {
        return res.status(404).json({
            status: false,
            message: "Post Not Found",
            data: null
        })
    }

    const post = await Post.findByIdAndUpdate(postId, {$push:{likes:memberId}}, {new:true})

    return res.status(200).json({
        status: true,
        message: "Post Liked Successfully",
        data: post
    })

});

exports.unlikePost = asyncErrorHandler(async (req, res, next) => {

    const { memberId, postId } = req.body

    if (!memberId) {
        return res.status(404).json({
            status: false,
            message: "Member Not Found",
            data: null
        })
    }
    if (!postId) {
        return res.status(404).json({
            status: false,
            message: "Post Not Found",
            data: null
        })
    }

    const post = await Post.findByIdAndUpdate(postId, {$pull:{likes:memberId}}, {new:true})

    return res.status(200).json({
        status: true,
        message: "Post Unliked Successfully",
        data: post
    })

});

exports.commentPost = asyncErrorHandler(async (req, res, next) => {
    const comment = {
        text:req.body.text,
        postedBy:req.body.memberId
    }

    const post = await Post.findByIdAndUpdate(req.body.postId, {$push:{comments:comment}}, {new:true}).populate("comments.postedBy", "_id firstname lastname relation").populate("postedBy","_id firstname lastname")

    return res.status(200).json({
        status: true,
        message: "Comment created Successfully",
        data: post
    })

});


// Delete Post ---
exports.deletePost = asyncErrorHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            status: false,
            message: "Post Not Found",
            data: null
        })
    }

    await post.deleteOne({ _id: req.params.id });

    return res.status(200).json({
        status: true,
        message: "Post deleted successfully",
    })

});