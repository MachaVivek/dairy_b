const mongoose = require("mongoose");
const storyschema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  isstory:{
    type:String,
    default:"story",
  },
  email:{
    type:String,
    required:true,
  },
  sname: {
    type: String,
    requried: true,
  },
  why:{
    type:String,
    requried:true
  }
},{collection:"story"});
module.exports = mongoose.model("storyschema", storyschema);
