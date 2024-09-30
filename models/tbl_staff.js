const mongoose = require("mongoose");
const staffSchema = mongoose.Schema({
photo : {
    type:String,
},
name : {
    type:String,
},
middleName : {
    type:String,
},
sex : {
    type:String,
},
phone:{
        type:String,
},
email : {
    type:String,
},
qualifaction : {
    type:String,
},
password : {
    type:String,
},
totalSalary : {
    type:String,
},
paidSalary : {
    type:String,
},
exp : {
    type:String,
},
address : {
    type:String,
},
state : {
    type:String,
},
city : {
    type:String,
},
type : {
    type:String,
},
staffActive : {
type : Number,
default : 1,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
branchId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Branch",
},
});
module.exports = mongoose.model("Staff",staffSchema);