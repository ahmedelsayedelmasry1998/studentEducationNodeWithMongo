const mongoose = require("mongoose");
const expensesSchema = mongoose.Schema({
expenses : {
    type:String,
},
amt : {
    type:Number,
},
date : {
    type:Date,
},
remark : {
    type:Number,
},
expensesActive : {
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
module.exports = mongoose.model("Expenses",expensesSchema);