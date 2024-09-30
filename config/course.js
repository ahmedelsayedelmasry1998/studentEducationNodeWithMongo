const mongoose = require("mongoose");
const Course = require("../models/tbl_course");
mongoose.connect("mongodb://localhost/educationStudent").then((resault) => {
    console.log("Connecting To DB ....");
}).catch((err) => {
    console.log(err.message);
});

var allCourses = [
new Course({
shortName : 'jkg',
name : 'Jr. Kg.',
}),
new Course({
shortName : 'skg',
name : 'Sr. Kg.',
}),
new Course({
shortName : '1',
name : 'STD 1',
}),
new Course({
shortName : '2',
name : 'STD 2',
}),
new Course({
shortName : '3',
name : 'STD 3',
}),
new Course({
shortName : '4',
name : 'STD 4',
}),
new Course({
shortName : '5',
name : 'STD 5',
}),
new Course({
shortName : '6',
name : 'STD 6',
}),
new Course({
shortName : '7',
name : 'STD 7',
}),
new Course({
shortName : '8',
name : 'STD 8',
}),
new Course({
shortName : '9',
name : 'STD 9',
}),
new Course({
shortName : '10',
name : 'STD 10',
}),
new Course({
shortName : '11 com',
name : 'STD 11(COMM)',
}),
new Course({
shortName : '12 com',
name : 'STD 12(COMM)',
}),
new Course({
shortName : '11 sci',
name : 'STD 11(SCI)',
}),
new Course({
shortName : '12 sci',
name : 'STD 12(SCI)',
}),
];
let done = 0;
for(let x = 0 ; x < allCourses.length;x++)
{
allCourses[x].save()
.then((resault)=>{
    console.log(resault);
if(done == allCourses.length)
{
    mongoose.disconnect();
}
done++;
})
.catch((err)=>{
    console.log(err);
});
}
