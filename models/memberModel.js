const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    required: false
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  community:{
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: false
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  }
})

const Member = mongoose.model("Member", memberSchema)
module.exports = Member