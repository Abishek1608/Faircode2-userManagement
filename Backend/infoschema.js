const mongoose =require("mongoose");


const infoSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Age:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    createdtime:{
        type:Date,
        default:Date.now
    }
}) 

module.exports =mongoose.model("info",infoSchema);