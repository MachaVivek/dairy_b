const mongoose = require("mongoose");
const dishschema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  isdish:{
    type:String,
    default:"dish",
  },
  email:{
    type:String,
    required:true,
  },
  dname: {
    type: String,
    requried: true,
  },
  why:{
    type:String,
    requried:true
  }
},{collection:"dish"});
module.exports = mongoose.model("dishschema", dishschema);
