const mongoose = require("mongoose");
const placeschema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  isplace:{
    type:String,
    default:"place",
  },
  email:{
    type:String,
    required:true,
  },
  pname: {
    type: String,
    requried: true,
  },
  why:{
    type:String,
    requried:true
  }
},{collection:"places"});
module.exports = mongoose.model("placeschema", placeschema);
