const mongoose = require("mongoose");
const peopleschema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  ispeople:{
    type:String,
    default:"people",
  },
  email:{
    type:String,
    required:true,
  },
  pename: {
    type: String,
    requried: true,
  },
  why:{
    type:String,
    requried:true
  }
},{collection:"people"});
module.exports = mongoose.model("peopleschema", peopleschema);
