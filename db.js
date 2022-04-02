const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/SpectrumQubicGame";
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(url);
module.exports = db;
