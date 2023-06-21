const path = require("path");
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config({ path: 'config.env' });
const DB = require('./config/database');
const userRouote = require('./routes/userRoute');
const ApiError = require('./utils/ApiError');
const errorMiddleware = require("./middlewares/errorMiddleware");

//
// var expressBusboy = require("express-busboy");
// expressBusboy.extend(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
DB();

app.use(express.static(path.join(__dirname, "uploads")));

app.use('/auth', userRouote);

app.use('*', (req, res, next) => {
  return next(new ApiError("can't find this page", 404))
});

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("server running...");
})
