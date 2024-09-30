const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
photo : {
    type:String,
},
fatherName : {
    type:String,
},
matherName : {
    type:String,
},
name : {
    type:String,
},
sex : {
    type:String,
},
phone : {
    type:String,
},
email : {
    type:String,
},
password : {
    type:String,
},
std : {
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
totalFees : {
    type:Number,
},
paidFees : {
    type:Number,
},
studentActive : {
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
module.exports = mongoose.model("Student",studentSchema);