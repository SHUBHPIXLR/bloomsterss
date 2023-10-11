const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  guardian: {
    type: String,
    required: true
  },
  profile: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
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
  children:[{
    firstname: {
      type: String,
      required: false
    },
    lastname: {
      type: String,
      required: false
    },
    dob: {
      type: String,
      required: true
    },
    profile: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    },
    gender: {
      type: String,
      required:false,
    },
    createdAt: {
      type: Number,
      default: Date.now(), 
    }
  }],
  createdAt: {
    type: Number,
    default: Date.now(), 
  }
})

const User = mongoose.model("User", userSchema)
module.exports = User