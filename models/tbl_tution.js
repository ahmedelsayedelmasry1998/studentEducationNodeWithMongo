const mongoose = require("mongoose");
const tutionSchema = mongoose.Schema({
name : {
    type:String,
},
tageLine : {
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
logo : {
    type:String,
},
email : {
    type:String,
},
phone : {
    type:String,
},
url : {
    type:String,
},
courses : {
    type:String,
},
});
module.exports = mongoose.model("Tution",tutionSchema);