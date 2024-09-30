const mongoose = require("mongoose");
const attendenseSchema = mongoose.Schema({
date : {
    type:Date,
},
attendense : {
    type:String,
},
type : {
    type:String,
},
attendenseActive : {
type:Number,
default : 1,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
studentId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Student",
},
});
module.exports = mongoose.model("Attendense",attendenseSchema);