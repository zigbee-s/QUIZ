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
                return res.status(422).json({error: "The Email Id or the password entered are wrong"});
            }else{
                return res.status(201).json({message:"Succesfull Login"});
            }
        }else{
            return res.status(422).json({error: "The Email Id or the password entered are wrong"});
        }

    }catch(err){
        console.log(err);
    }
    
})

router.post('/register', async (req,res)=>{
    const {name,email,password,cpassword} = req.body;
    
    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error: "Incomplete Credentials"});
    }
    try{
        const userExist = await User.findOne({email:email})
         if(userExist){
            return res.status(422).json({error:"Email already registered"});
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
        const {email, answer, newScore,quizEnded} = req.body;
        
        if(!email || !answer){
            return res.status(400).json({error: "Incomplete Details"});
        }
        
        const userLogin = await User.findOne({email:email});
        if(userLogin){
            if(userLogin.answers.length == 4){
                quizEnded = true;
            }
            const added = await userLogin.addAnswer(answer, newScore, quizEnded);                  
            return res.status(201).json({message: "Answer Added", score: newScore, data: quizEnded, currentIndex: added - 1});

        }else{
            return res.status(422).json({error: "Invalid Credentials"});
        }

    }catch(err){
        console.log(err);
    }
}) 

router.get('/signout', (req,res) => {
    console.log("fghjk");
    res.clearCookie('jwtoken', { path: '/'});
    res.status(200).send('User Signed Out');
})

module.exports = router;