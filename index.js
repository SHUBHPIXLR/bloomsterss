const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary");
// const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// import all routes
const user = require("./routes/userRoute");
const member = require("./routes/memberRoute")
const post = require("./routes/postRoute")
const journal = require("./routes/journalRoute")
const todo = require("./routes/todoRoute")
const fileUploadRoute = require("./imageRoute")
const stripeRoute = require("./stripeRoute")

app.use("/api", user)
app.use("/api", member)
app.use("/api", post)
app.use("/api", journal)
app.use("/api", todo)
app.use("/image", fileUploadRoute)
app.use("/payment", stripeRoute)

app.use("/", (req, res) => {
    return res.send("server run successfully")
})

// connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to handle error
// app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

module.exports = app;
