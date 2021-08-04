const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ACCESS.toString(),{
    userNewUrlParser: true,
    userUnifiedTopology: true,
    userCreateIndex: true,
    userFindAndModify: false
}).then(()=>{
    console.log(`connection sucessfull`);
}).catch((e) => {
    console.log(`Error in connecting db: \n ${e}`);
});

