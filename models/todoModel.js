const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    date: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    child:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    }
})

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo