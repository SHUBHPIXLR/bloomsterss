const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    video: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    milestone: {
        type: String,
        required: false
    },
    question: {
        type: String,
        required: false
    },
    option: {
        type: Array,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "Member",
        required: false
    }],
    comments: [{
        text: {
            type: String,
            required: false
        },
        postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "Member",
            required: false
        }
    }],
    createdAt: {
        type: Number,
        default: Date.now(),
    }
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post