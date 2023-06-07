const express =require("express")
const mongoose =require("mongoose")
const cors = require("cors");
const app=express()

mongoose.connect("mongodb+srv://vivek:vivekmacha@practise.v6gyra4.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("db connected")
})

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
// this contains routes
app.use(require('./router/auth'))



// middleware
const middleware=(req,res,next)=>{
    console.log("this is middleware");
    next();
}

app.listen(5000, () => {
    console.log("server running...");
});