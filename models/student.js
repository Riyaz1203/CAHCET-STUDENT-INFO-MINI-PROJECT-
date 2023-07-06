const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registor_no:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    mobile_no:{
        type:String,
        required:true
    },
    fees:{
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
    },
    roll_no:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("student", StudentSchema);