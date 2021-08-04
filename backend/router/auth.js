const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


require('../db/conn');
const User = require("../model/userSchema");


router.post('/signin', async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Incomplete Details"});
        }
        
        const userLogin = await User.findOne({email:email});
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            const token = await userLogin.generateAuthToken();


            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 15000000),
                httpOny: true
            })

                                
            if(!isMatch){
                return res.status(422).json({error: "Invalid Credentials"});
            }else{
                return res.status(201).json({message:"Succesfull Login"});
            }
        }else{
            return res.status(422).json({error: "Invalid Credentials"});
        }

    }catch(err){
        console.log(err);
    }
    
})

router.post('/register', async (req,res)=>{
    const {name,email,password,cpassword} = req.body;
    
    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error: "Invalid Credentials"});
    }
    try{
        const userExist = await User.findOne({email:email})
         if(userExist){
            return res.status(422).json({error:"User Exists"});
        }else if(password != cpassword){
            return res.status(422).json({error: "Password doesn't match"});
        }else{
            const user = new User({name,email,password,cpassword});

            await user.save();

            res.status(201).json({message:"user registered succesfully"});
        }
    }catch(err){
        console.log(err);
    }
})


router.get('/quiz', authenticate, (req,res)=>{
    res.send(req.rootUser);
}) 

router.post('/answer', async (req,res)=>{
    try{
        const {email, answer} = req.body;
        
        if(!email || !answer){
            return res.status(400).json({error: "Incomplete Details"});
        }
        
        const userLogin = await User.findOne({email:email});
        if(userLogin){
            const added = await userLogin.addAnswer(answer);                  
            return res.status(201).json({message: "Answer Added"});

        }else{
            return res.status(422).json({error: "Invalid Credentials"});
        }

    }catch(err){
        console.log(err);
    }
}) 

module.exports = router;