const path = require("path");
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config({ path: 'config.env' })
const DB = require('./config/database').apply();

const ApiError = require('./utils/ApiError');
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));

const userRouote = require('./routes/userRoute');
const messageRoute = require('./routes/message');
app.use('/api/v1/auth', userRouote);
app.use("/api/v1/message", messageRoute);

app.use('*', (req, res, next) => {
  return next(new ApiError("can't find this page", 404))
});

app.use(errorMiddleware);

const port=process.env.PORT||3000
app.listen(port, () => {
  console.log("server running...");
});
