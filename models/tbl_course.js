const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
shortName : {
    type:String,
},
name : {
    type:String,
}
});
module.exports = mongoose.model("Course",courseSchema);