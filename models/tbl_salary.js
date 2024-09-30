const mongoose = require("mongoose");
const salarySchema = mongoose.Schema({
date : {
    type:Date,
},
amt : {
    type:Number,
},
total : {
    type:Number,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
staffId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Staff",
},
branchId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Branch",
},
});
module.exports = mongoose.model("Salary",salarySchema);