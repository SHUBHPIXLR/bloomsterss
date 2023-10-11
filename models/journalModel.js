const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema({
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
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
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

const Journal = mongoose.model("Journal", journalSchema)
module.exports = Journal