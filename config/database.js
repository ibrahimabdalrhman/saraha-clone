const mongoose = require('mongoose');

const DB = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => console.log("database connected..."))
    .catch((err) => console.log(err));

module.exports = DB;