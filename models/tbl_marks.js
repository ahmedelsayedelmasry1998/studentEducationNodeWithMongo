const mongoose = require("mongoose");
const marksSchema = mongoose.Schema({
date : {
    type:Date,
    default : Date.now,
},
eng1 : {
    type:Number,
},
gramer : {
    type:Number,
},
maths : {
    type:Number,
},
sci : {
    type:Number,
},
ss : {
    type:Number,
},
env : {
    type:Number,
},
gk : {
    type:Number,
},
hindi : {
    type:Number,
},
sanskrit : {
    type:Number,
},
computer : {
    type:Number,
},
eco : {
    type:Number,
},
oc : {
    type:Number,
},
ac : {
    type:Number,
},
guj : {
    type:Number,
},
bio : {
    type:Number,
},
studentId : {
    type:mongoose.Schema.Types.ObjectId,
    ref : "Student",
},
});
module.exports = mongoose.model("Mark",marksSchema);