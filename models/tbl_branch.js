const mongoose = require("mongoose");
const branchSchema = mongoose.Schema({
address : {
    type:String,
},
state : {
    type:String,
},
city : {
    type:String,
},
phone : {
    type:String,
},
branchActive : {
type:Number,
default : 1,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
});
module.exports = mongoose.model("Branch",branchSchema);