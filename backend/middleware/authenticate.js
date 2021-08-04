const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req,res,next) => {
    try{
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET);
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){ throw new Error("User Not found")}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }catch(err){
        console.log(err);
        res.status(401).send("Unauthorized: No token provided")
    }
}

module.exports = authenticate;