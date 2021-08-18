const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    tokens:[
        {
            token: {
                type: String,
            required: true
        },
            
        }
    ],
    answers:[
        {
            answer: {
                type: String,
                required: true
            }
        }
    ],
    score: {
        type: Number,
        default:0
    },
    quizEnded: {
        type: Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    }
})




//HAshing the Password

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();     
});


// We are generating token 
// Using method because it is an Instance
//We can't use fat arrow function, because it doesn't support using this keyword
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.addAnswer = async function(answer, newScore, quizEnded){
    try{
        this.answers = this.answers.concat({answer:answer});
        this.score = newScore;
        this.quizEnded = quizEnded;
        await this.save();
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;