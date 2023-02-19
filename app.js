const express = require("express");

const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/postRoute");

dotenv.config();

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = app;
