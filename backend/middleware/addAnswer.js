const User = require('../model/userSchema');

const addAnswer = async (req,res,next)=>{
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET);
    const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

    if(!rootUser){ throw new Error("User Not found")};
    
}