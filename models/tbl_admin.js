const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
fName : {
    type:String,
},
lName : {
    type:String,
},
address : {
    type:String,
},
email : {
    type:String,
},
phone : {
    type:String,
},
password : {
    type:String,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
});
module.exports = mongoose.model("Admin",adminSchema);