const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
require('dotenv').config();
const app=express();
const helmet=require('helmet');
const morgan = require('morgan');
const routefile = require('./routes/web');
const expressValidator = require('express-validator');

//Connection db
mongoose.connect(
    process.env.DATABASE,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify: false
})
.then(console.log("Connection DATABASE OK ..."))
.catch((err)=>console.log("Connection Feiled !"))

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Routes
app.use('/',routefile);


const port =process.env.PORT;
app.listen(port,()=>console.log(`Connection to Port : ${port} ...`))