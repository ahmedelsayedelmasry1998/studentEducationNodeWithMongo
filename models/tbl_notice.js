const mongoose = require("mongoose");
const noticeSchema = mongoose.Schema({
noticeHead : {
    type:String,
},
noticeBody : {
    type:String,
},
recipient : {
    type:String,
},
date : {
    type:Date,
    default : Date.now,
},
time : {
    type:Date,
    default:Date.now,
},
tutionId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Tution",
},
});
module.exports = mongoose.model("Notice",noticeSchema);