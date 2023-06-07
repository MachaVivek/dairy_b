const mongoose =require('mongoose')
const bcrypt =require('bcryptjs')

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    keyy:{
        type:String,
        required:true
    },
    ckeyy:{
        type:String,
        required:true
    }
})

// hashing the password and key
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    } 
    next()
})

module.exports=mongoose.model("signup",userSchema)