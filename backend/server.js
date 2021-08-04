const jwt = require('jsonwebtoken');

require('dotenv').config();
const express = require('express');
const app = express();

var cookies = require("cookie-parser");
app.use(cookies());

const PORT = process.env.PORT;

// Middleware

//Connect To the Database
require("./db/conn");
app.use(express.json());


//Linking routes
app.use(require('./router/auth'));



app.listen(PORT,()=>{console.log(`Server started at ${PORT}`)});