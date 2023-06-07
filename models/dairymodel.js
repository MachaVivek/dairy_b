const mongoose = require("mongoose");
const dailyschema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  isdairy:{
    type:String,
    default:"daily dairy",
  },
  rad:{
    type:Array,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  daname: {
    type: String,
    requried: true,
  },
  why:{
    type:String,
    requried:true
  }
},{collection:"daily"});
module.exports = mongoose.model("dailyschema", dailyschema);
