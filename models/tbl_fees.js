const mongoose = require("mongoose");
const feesSchema = mongoose.Schema({
date : {
    type:Date,
},
amt : {
    type:Number,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
studentId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Student",
},
branchId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Branch",
},
});
module.exports = mongoose.model("Fees",feesSchema);