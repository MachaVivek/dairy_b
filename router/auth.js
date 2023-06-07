const express =require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const user=require('../models/mregister');
const placeschema=require("../models/placemodel")
const peopleschema=require("../models/peoplemodel")
const dishschema=require("../models/dishmodel")
const storyschema=require("../models/storymodel")
const dailyschema=require("../models/dairymodel")

//register route
router.post('/postregister',async(req,res)=>{
    const { fname,lname,gender,email,password,keyy,ckeyy}=req.body;
    if(!fname || !lname || !gender || !email || !password || !keyy || !ckeyy){
        return res.status(422).json({error:"fill all the options"})
    }

    try{
        const response =await user.findOne({email:email});
        if(response){
            return res.status(422).json({error:"already registerd"})
        }else if(keyy!=ckeyy){
            return res.status(422).json({error:"conform password not matching"})
        }else{
            const userr=new user( {fname,lname,gender,email,password,keyy,ckeyy});

            //password hashing before saving at schema page

            await userr.save()
            res.status(201).json({message:"registerd succesfully"})

        }
    }catch(err){
        console.log(err)
    } 
});

//login route
router.post("/postlogin",async(req,res)=>{
    try{
        const {fname,email,password}=req.body;
        if(!fname || !email || !password){
            return res.status(400).json({error:"please fill all the options"})
        }
        const userlogin= await user.findOne({email:email});

        // checking whether passwords entered is valid or not
        if(userlogin){
            const isMatch=await bcrypt.compare(password,userlogin.password);

            console.log(isMatch);

            if(isMatch==false){
                res.status(400).json({error:"fill correct creditionals"})
            }else{
                res.status(201).json({message:"login successful"})
            }
        }
    }catch(error){
        console.log(error)
    }
})

router.post("/checkkey",async(req,res)=>{
    try{
        const {keyy}=req.body;
        if(!keyy){
            return res.status(400).json({error:"please enter the key"})
        }
        const userkey= await user.findOne({keyy:keyy});
        // checking whether key entered is valid or not
        if(userkey){
            res.status(201).json({message:"valid"})

            const date = new Date();
            const showdate=date.getFullYear()+':'+`${date.getMonth()+1}`+':'+date.getDate()
            const showTime = date.getHours() 
                + ':' + date.getMinutes() 
                + ":" + date.getSeconds();

            const nodemailer = require("nodemailer");
            const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "assignmentsproject9@gmail.com",
                pass: "mtbikanioizdiavh",
            },
            });
            const mailoption = {
            form: "assignmentsproject9@gmail.com",
            to: userkey.email,
            subject: "Daily Dairy",
            text:  `you opend your dairy ${showdate} at ${showTime}`,
            };
            transporter.sendMail(mailoption, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email sent " + info.response);
            }
            });
        }else{
            res.status(400).json({error:"invalid"})
        }
    }catch(error){
        console.log(error)
    }
})

// posting places
router.post("/postfplaces", async (req, res) => {
    const { email, pname, why } = req.body;
    let x=0;
    for(let i=0;i<email.length;i++){
        x+=email[i].charCodeAt()
    }
    function usingkey(s){
        let final="";
        for(let i=0;i<s.length;i++){
            final+=(s[i].charCodeAt()*x/17).toString()
            final+="#";
        }
        return final
    }
    let encryptedpname=usingkey(pname)
    let encryptedwhy=usingkey(why)
  
    try {
      const newData = new placeschema({
        email: email,
        pname: encryptedpname,
        why: encryptedwhy,
      });
      await newData.save();
      return res.json(await placeschema.find());
    } catch (err) {
      console.log(err);
    }
  });

// get the favouarte places
router.get("/getfplaces/:email", async (req, res) => {
    try {
      let email = req.params.email;
      const data =await placeschema.find({email:email});
      res.send({status:"success",data:data})
    } catch (err) {
      console.log(err);
    }
});

// posting people
router.post("/postfpeople", async (req, res) => {
    const { email, pename, why } = req.body;
    let x=0;
    for(let i=0;i<email.length;i++){
        x+=email[i].charCodeAt()
    }
    function usingkey(s){
        let final="";
        for(let i=0;i<s.length;i++){
            final+=(s[i].charCodeAt()*x/17).toString()
            final+="#";
        }
        return final
    }
    let encryptedpename=usingkey(pename)
    let encryptedwhy=usingkey(why)
  
    try {
      const newData = new peopleschema({
        email: email,
        pename: encryptedpename,
        why: encryptedwhy,
      });
      await newData.save();
      return res.json(await peopleschema.find());
    } catch (err) {
      console.log(err);
    }
  });

//geting favorite people data
router.get("/getfpeople/:email", async (req, res) => {
    try {
      let email = req.params.email;
      const data =await peopleschema.find({email:email});
      res.send({status:"success",data:data})
    } catch (err) {
      console.log(err);
    }
});

//posting favorite dish
router.post("/postfdish", async (req, res) => {
    const { email, dname, why } = req.body;
    let x=0;
    for(let i=0;i<email.length;i++){
        x+=email[i].charCodeAt()
    }
    function usingkey(s){
        let final="";
        for(let i=0;i<s.length;i++){
            final+=(s[i].charCodeAt()*x/17).toString()
            final+="#";
        }
        return final
    }
    let encrypteddname=usingkey(dname)
    let encryptedwhy=usingkey(why)
  
    try {
      const newData = new dishschema({
        email: email,
        dname: encrypteddname,
        why: encryptedwhy,
      });
      await newData.save();
      return res.json(await dishschema.find());
    } catch (err) {
      console.log(err);
    }
  });

//geting favorite dish
router.get("/getfdish/:email", async (req, res) => {
    try {
      let email = req.params.email;
      const data =await dishschema.find({email:email});
      res.send({status:"success",data:data})
    } catch (err) {
      console.log(err);
    }
});


// posting story
router.post("/postfstory", async (req, res) => {
    const { email, sname, why } = req.body;
    let x=0;
    for(let i=0;i<email.length;i++){
        x+=email[i].charCodeAt()
    }
    function usingkey(s){
        let final="";
        for(let i=0;i<s.length;i++){
            final+=(s[i].charCodeAt()*x/17).toString()
            final+="#";
        }
        return final
    }
    let encryptedsname=usingkey(sname)
    let encryptedwhy=usingkey(why)
  
    try {
      const newData = new storyschema({
        email: email,
        sname: encryptedsname,
        why: encryptedwhy,
      });
      await newData.save();
      return res.json(await storyschema.find());
    } catch (err) {
      console.log(err);
    }
  });

// get the favouarte story
router.get("/getfstory/:email", async (req, res) => {
    try {
      let email = req.params.email;
      const data =await storyschema.find({email:email});
      res.send({status:"success",data:data})
    } catch (err) {
      console.log(err);
    }
});

// posting places
router.post("/postfplaces", async (req, res) => {
  const { email, pname, why } = req.body;
  let x=0;
  for(let i=0;i<email.length;i++){
      x+=email[i].charCodeAt()
  }
  function usingkey(s){
      let final="";
      for(let i=0;i<s.length;i++){
          final+=(s[i].charCodeAt()*x/17).toString()
          final+="#";
      }
      return final
  }
  let encryptedpname=usingkey(pname)
  let encryptedwhy=usingkey(why)

  try {
    const newData = new placeschema({
      email: email,
      pname: encryptedpname,
      why: encryptedwhy,
    });
    await newData.save();
    return res.json(await placeschema.find());
  } catch (err) {
    console.log(err);
  }
});

// get the favouarte dailydairy
router.get("/getfdailydairy/:email", async (req, res) => {
  try {
    let email = req.params.email;
    const data =await dailyschema.find({email:email});
    res.send({status:"success",data:data})
  } catch (err) {
    console.log(err);
  }
});

// posting people
router.post("/postfdailydairy", async (req, res) => {
  const { email, daname, why,rad } = req.body;
  let x=0;
  for(let i=0;i<email.length;i++){
      x+=email[i].charCodeAt()
  }
  function usingkey(s){
      let final="";
      for(let i=0;i<s.length;i++){
          final+=(s[i].charCodeAt()*x/17).toString()
          final+="#";
      }
      return final
  }
  let encrypteddaname=usingkey(daname)
  let encryptedwhy=usingkey(why)

  try {
    const newData = new dailyschema({
      email: email,
      rad:rad,
      daname: encrypteddaname,
      why: encryptedwhy,
    });
    await newData.save();
    return res.json(await dailyschema.find());
  } catch (err) {
    console.log(err);
  }
});


module.exports=router;