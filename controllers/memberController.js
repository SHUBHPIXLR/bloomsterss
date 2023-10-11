const Member = require('../models/memberModel');
const jwt = require("jsonwebtoken")
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler')

// Register Member
exports.signupMember = asyncErrorHandler( async (req, res, next) => {
     
    const newMember = req.body;
    const alreadyMemberExist = await Member.find({ email: newMember.email.toLowerCase() })
    if (alreadyMemberExist.length > 0 ) {
        return res.json({
          status: false,
          message: "Member already exist with this username!",
          data: null
        })
    }else{
        const member = await Member.create(newMember);
        return res.status(200).json({
            status: true,
            message: "Member created successfully",
            data: member
        })
    }
});

// Login Member
exports.loginMember = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const member = await Member.findOne({email, password})
    
    if(!member) {
        
        return res.status(401).json({
            status: false,
            message: "Invalid Email or Password",
            data: null
        })

    }else {
        const token = jwt.sign({ id: member._id.toString() }, process.env.JWT_SECRET)

        return res.status(200).json({
            status: true,
            message: "Login successfully",
            data: {
                user:member,
                token:token
            }
        })
    }
    
});

// Update Member
exports.updateMember = asyncErrorHandler( async (req, res, next) => {

    const newMember = req.body.member;
    const memberId = req.params.id;
    const updatedMember = await Member.findByIdAndUpdate(memberId, newMember, {new: true})
    return res.status(200).json({
        status: true,
        message: "Member updated successfully",
        data: updatedMember
    })
});

// Get All Members --ADMIN
exports.getAllMembers = asyncErrorHandler(async (req, res, next) => {
    
    const members = await Member.find();

    res.status(200).json({
        status: true,
        message: "All members fetched successfully",
        members,
    });
});

// Get Member Details
exports.getMemberDetails = asyncErrorHandler(async (req, res, next) => {
    
    const member = await Member.findById(req.params.id);

    if(!member){
        return res.status(404).json({
            status:false,
            message:"Member Not Found",
            data:null
        })
    }

    return res.status(200).json({
        status: true,
        message: "member fetch successfully",
        data: member
    })
    
});

// Logout Member
exports.logoutMember = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        // httpOnly: true,
    });
    return res.json({
        status: true,
        message: "Logged Out",
    })
});

// Delete Member ---ADMIN
exports.deleteMember = asyncErrorHandler(async (req, res, next) => {

    const member = await Member.findById(req.params.id);

    if (!member) {
        return res.status(404).json({
            status:false,
            message:"Member Not Found",
            data:null
        })
    }

    await member.deleteOne({_id: req.params.id});

    return res.json({
        status: true,
        message: "Member deleted successfully",
    })
    
});



// // email verify
// exports.emailVerify = asyncErrorHandler(async (req, res, next) => {

//     let mailTransporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'abbas.pixlrit@gmail.com',
//             pass: 'xbhaknhuxcntgkij'
//         }
//     });

//     let otp = Math.floor(1000 + Math.random() * 9000);
     
//     let mailDetails = {
//         from: 'abbas.pixlrit@gmail.com',
//         to: 'shubhamnavait321@gmail.com',
//         subject: 'Test mail',
//         text: `Service provider email verify otp is : ${otp}`
//     };

//     mailTransporter.sendMail(mailDetails, function(err, data) {
//         if(err) {
//             return res.json({
//                 status: false,
//                 message: "Error Occurs!",
//                 data: null
//             })
//         } else {
//             return res.json({
//                 status: true,
//                 message: "Email sent successfully",
//                 data: data
//             })
//         }
//     });
// });