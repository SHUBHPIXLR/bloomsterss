const User = require('../models/userModel');
const Member = require('../models/memberModel')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler')

// Register User
exports.registerUser = asyncErrorHandler( async (req, res, next) => {
     
    const newUser = req.body;
    const alreadyUserExist = await User.find({ email: newUser.email.toLowerCase() })
    if (alreadyUserExist.length > 0 ) {
        return res.json({
          status: false,
          message: "User already exist with this username!",
          data: null
        })
    }else{
        const user = await User.create(newUser);
        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data: user
        })
    }
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email, password})
    
    if(!user) {
        
        return res.status(401).json({
            status: false,
            message: "Invalid Email or Password",
            data: null
        })

    }else {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        return res.status(200).json({
            status: true,
            message: "Login successfully",
            data: {
                user:user,
                token:token
            }
        })
    }
    
});

// email verify
exports.verifyOtp = asyncErrorHandler(async (req, res, next) => {

    const { email } = req.body

    const user = await User.findOne({email})
    const member = await Member.findOne({email})
    if(!user && !member){
        return res.status(401).json({
            status:false,
            message:"Invalid Email",
            data: null
        })
    }else if(user){
        
        let mailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'abbas.pixlrit@gmail.com',
                pass: 'xbhaknhuxcntgkij'
            }
        });
    
        let otp = Math.floor(1000 + Math.random() * 9000);

        user.otp = otp
         
        let mailDetails = {
            from: 'abbas.pixlrit@gmail.com',
            to: user.email,
            subject: 'Bloomsterss Verification',
            text: `Your Varification otp is : ${otp}`
        };

        await user.save();
    
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                return res.json({
                    status: false,
                    message: "Error Occurs!",
                    // data: null
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: "Email sent successfully",
                })
            }
        });



    }else if(member){
        
        let mailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'abbas.pixlrit@gmail.com',
                pass: 'xbhaknhuxcntgkij'
            }
        });
    
        let otp = Math.floor(1000 + Math.random() * 9000);

        member.otp = otp
         
        let mailDetails = {
            from: 'abbas.pixlrit@gmail.com',
            to: member.email,
            subject: 'Bloomsterss Verification',
            text: `Your Varification otp is : ${otp}`
        };

        await member.save();
    
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                return res.json({
                    status: false,
                    message: "Error Occurs!",
                    // data: null
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: "Email sent successfully",
                    // data: data
                })
            }
        });

    }
    
});

// Update User
exports.updateUser = asyncErrorHandler( async (req, res, next) => {

    const newUser = req.body.user;
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {new: true})
    return res.status(200).json({
        status: true,
        message: "User updated successfully",
        data: updatedUser
    })
});

exports.updateChild = asyncErrorHandler( async (req, res, next) => {

    const newChild = req.body.child;
    const userId = req.params.id;
    const user = await User.findById(userId);
    // const isCreated = user.children.find(child => child._id.toString() === childId.toString());
    const alreadyExits = user.children.filter(child => child.firstname === newChild.firstname) 
    if(!userId){
        return res.status(404).json({
            status: false,
            message: "User not found",
            data: null
        })
    }
    if(Object.keys(newChild).length === 0){
        return res.status(404).json({
            status: false,
            message: "Child not found",
            data: null
        })
    }
    if(alreadyExits.length > 0){
        return res.status(404).json({
            status: false,
            message: "Child already exist",
            data: null
        })
    }
    user.children.push(newChild);
    await user.save();
    return res.status(201).json({
        status: true,
        message: "Child created successfully",
        data: user
    })

    
});

exports.deleteChild = asyncErrorHandler( async (req, res, next) => {

    const childId = req.body.child_id
    const userId = req.params.id;
    const user = await User.findById(userId);

    if(!userId){
        return res.status(404).json({
            status: false,
            message: "User not found",
            data: null
        })
    }

    if(!childId){
        return res.status(404).json({
            status: false,
            message: "Child not found",
            data: null
        })
    }
    
    const newArray = user.children.filter(child => {
        return child._id.toString() !== childId.toString();
    });

    user.children = newArray

    await user.save();
    return res.status(200).json({
        status: true,
        message: "Child deleted successfully",
        data: user
    })

});


// Get All Users --ADMIN
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: true,
        message: "All users fetched successfully",
        data: users
    });
});


// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            status:false,
            message:"User Not Found",
            data:null
        })
    }

    return res.status(200).json({
        status: true,
        message: "user fetch successfully",
        data: user
    })
    
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        // httpOnly: true,
    });
    return res.json({
        status: true,
        message: "Logged Out",
    })
});

// Delete User ---ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status:false,
            message:"User Not Found",
            data:null
        })
    }

    await user.deleteOne({_id: req.params.id});

    return res.json({
        status: true,
        message: "User deleted successfully",
    })
    
});
