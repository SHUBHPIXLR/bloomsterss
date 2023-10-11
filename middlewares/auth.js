const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

    try {
        const token = req.body.token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode.id })
        if (!user) {
            return res.json({
                status: false,
                message: "Authentication Failure!",
                data: null
            })
        }
        else {
            req.user = user
        }
        req.token = token
        next()

    } catch (e) {
        const E = Object.getOwnPropertyNames(e).reduce((acc, curr) => {
            acc[curr] = e[curr];
            return acc;
        }, {});
        return res.json({
            status: false,
            message: E.message,
            data: null
        })
    }
})
