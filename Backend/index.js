//third party
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan =require("morgan");
const cors =require("cors");
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json()
// const urlencodedParser = bodyParser.urlencoded({ extended: false })


//middleware
app.use(morgan("dev"));
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.bodyParser());
app.use(express.json());


//Router
const infoRouter = require("./router");
app.use("/info",infoRouter);





//listen port
app.listen(5000,() =>{
    console.log("server started sucessfully");
})



mongoose.set('strictQuery', false);


//Db connection
mongoose.connect("mongodb://localhost/managementsystem",{useNewUrlParser : true},(err) =>{
    if(!err){
        console.log("DB connected sucessfully");
    }
})