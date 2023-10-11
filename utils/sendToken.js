const sendToken = (resData, statusCode, res) => {
    const token = resData.data.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    // res.status(statusCode).cookie('token', token, options).json({
    //     success: true,
    //     user,
    //     token,
    // });

    res.status(statusCode).cookie('token', token, options).json({
        status: true,
        message:resData.message,
        data: resData.data,
        token,
    });

}

module.exports = sendToken;