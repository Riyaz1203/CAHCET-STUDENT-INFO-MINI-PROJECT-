const mongoose = require('mongoose');
const facultySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    faculty_id:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    joined:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile_no:{
        type:String,
        required:true
    },
    attendance:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("faculty", facultySchema);