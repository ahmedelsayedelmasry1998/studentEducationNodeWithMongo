var express = require('express');
var router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload_files/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);;
  }
});
const upload = multer({ storage: storage });

const Admin = require("../models/tbl_admin");
const Tution = require("../models/tbl_tution");
const Branch = require("../models/tbl_branch");
const Student = require("../models/tbl_student");
const Staff = require("../models/tbl_staff");
const Expenses = require("../models/tbl_expenses");
const Attendense = require("../models/tbl_attendense");
const Mark = require("../models/tbl_marks");
const Fees = require("../models/tbl_fees");
const Salary = require("../models/tbl_salary");
const Course = require("../models/tbl_course");
const Notice = require("../models/tbl_notice");

/* GET home page. */
router.get('/', function (req, res, next) {
  Branch.find({branchActive:1})
  .then((branches)=>{
    let branchesCount = branches.length;
    res.render('index', { title: 'Studient Education' });
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.get('/aboutUs', function (req, res, next) {
  res.render('aboutUs', { title: 'Studient Education', layout: 'customLayout' });
});
router.post('/aboutUs', function (req, res, next) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var emailId = req.body.emailId;
  var mobileNumber = req.body.mobileNumber;
  var password = req.body.password;
  var rPassword = req.body.rPassword;
  var classesName = req.body.classesName;
  var tageline = req.body.tageline;
  var selectCourse = req.body.selectCourse;
  var address = req.body.address;
  var state = req.body.state;
  var phoneNumber = req.body.phoneNumber;
  var url = req.body.url;


  if (password == rPassword) {
    var addTution = new Tution({
      name: classesName,
      tageLine: tageline,
      address: address,
      state: state,
      phone: phoneNumber,
      url: url,
      courses: selectCourse,
    });
    addTution.save().then((resault) => {
      Tution.find({ address: address, phone: phoneNumber }).then((tution) => {
        var tutionId = tution[0]._id;
        var addAdmin = new Admin({
          fName: fName,
          lName: lName,
          address: address,
          email: emailId,
          phone: mobileNumber,
          password: password,
          tutionId: tutionId,
        });
        addAdmin.save().then((admin) => {
          res.redirect("/");
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });

  } else {
    req.flash("signUpError", "Password Is Not Matched With Re Password ...");
    res.redirect("/signUp");
  }
});
router.get('/contactUs', function (req, res, next) {
  res.render('contactUs', { title: 'Studient Education', layout: 'customLayout' });
});
router.get('/adminLogin', function (req, res, next) {
  var adminLoginError = req.flash("adminLoginError");
  res.render('adminLogin', { title: 'Studient Education', layout: 'customLayout', adminLoginError: adminLoginError });
});
router.get("/dashboard", function (req, res, next) {
  Branch.find({branchActive :1})
  .then((branches)=>{
    Student.find({studentActive : 1})
    .then((students)=>{
      Staff.find({staffActive :1})
      .then((staffs)=>{
        Expenses.find({expensesActive:1})
        .then((expenses)=>{
          Attendense.find({attendenseActive:1,attendense:1}).then((allPass)=>{
            Attendense.find({attendenseActive:1,attendense:0}).then((allFail)=>{
              Fees.find({}).then((fees)=>{
                Salary.find({}).then((salaries)=>{
                  Tution.find({}).then((tutions)=>{
                    res.render('dashboard', { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, branchesCount:branches.length,studentCount : students.length,staffCount:staffs.length,expensesCount:expenses.length,passCount:allPass.length,failCount:allFail.length,feesCount:fees.length,salaries : salaries.length,tutions:tutions.length});
                  })
                  .catch((err)=>{
                    console.log(err);
                  });
                })
                .catch((err)=>{
                  console.log(err);
                });
              })
              .catch((err)=>{
                console.log(err);
              });
            })
            .catch((err)=>{
              console.log(err);
            });
          })
          .catch((err)=>{
            console.log(err);
          });
        })
        .catch((err)=>{
          console.log(err);
        });
      })
      .catch((err)=>{
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.post('/adminLogin', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (email == "" || password == "") {
    req.flash("adminLoginError", "Please Enter All Data ...");
    res.redirect("/adminLogin");
  } else {
    Admin.find({ email: email, password: password })
      .then((resault) => {
        if (resault.length > 0) {
          req.session.admin = resault[0];
          res.redirect("/dashboard");
        } else {
          req.flash("adminLoginError", "Email Is Not Found ...");
          res.redirect("/adminLogin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
router.get('/staffLogin', function (req, res, next) {
  res.render('staffLogin', { title: 'Studient Education', layout: 'customLayout' });
});
router.get('/studientLogin', function (req, res, next) {
  res.render('studientLogin', { title: 'Studient Education', layout: 'customLayout' });
});
router.get('/signUp', function (req, res, next) {
  var signUpError = req.flash("signUpError");
Course.find({})
.then((resault)=>{
  res.render('signUp', { title: 'Studient Education', layout: 'customLayout', signUpError: signUpError,courses:resault });
})
.catch((err)=>{
  console.log(err);
});
});
router.get('/manageBranch', function (req, res, next) {
  Branch.find({ branchActive: 1 }).then((resault) => {
    res.render('manageBranch', { title: 'Studient Education', layout: 'adminLayout', branches: resault, adminEmail: req.session.admin.email });
  }).catch((err) => {
    console.log(err);
  });
});
router.get('/addBranch', function (req, res, next) {
  res.render('addBranch', { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email });
});
router.post('/addBranch', function (req, res, next) {
  var address = req.body.address;
  var state = req.body.state;
  var city = req.body.city;
  var contact = req.body.contact;
  var addBranch = new Branch({
    address: address,
    state: state,
    city: city,
    phone: contact,
    tutionId: req.session.admin.tutionId,
  });
  addBranch.save().then((resault) => {
    res.redirect('/manageBranch');
  })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/deleteBranch/:branchId', function (req, res, next) {
  var branchId = req.params.branchId;
  console.log(branchId);
  let updateBranch = {
    branchActive: 0,
  };
  Branch.updateOne({ _id: branchId }, { $set: updateBranch }).then((resault) => {
    res.redirect('/manageBranch');
  }).catch((err) => {
    console.log(err);
  });
});

router.get("/updateBranch", (req, res, next) => {
  var branch = req.flash('branch');
  var gujarat;
  var maharashtra;
  var westBengal;
  var rajasthan;
  if (branch[0].state == 'Gujarat') {
    gujarat = 'Gujarat';
  } else if (branch[0].state == 'Maharashtra') {
    maharashtra = 'Maharashtra';
  } else if (branch[0].state == 'West Bengal') {
    westBengal = 'West Bengal';
  } else if (branch[0].state == 'Rajasthan') {
    rajasthan = 'Rajasthan';
  } else {
    var gujarat = null;
    var maharashtra = null;
    var westBengal = null;
    var rajasthan = null;
  }
  res.render("editBranch", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, branch: branch[0], gujarat: gujarat, maharashtra: maharashtra, westBengal: westBengal, rajasthan: rajasthan });
});
router.get("/updateBranch/:branchId", (req, res, next) => {
  var branchId = req.params.branchId;
  Branch.find({ _id: branchId })
    .then((resault) => {
      req.flash('branch', resault);
      res.redirect("/updateBranch");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateBranch", (req, res, next) => {
  var address = req.body.address;
  var branchId = req.body.branchId;
  var state = req.body.state;
  var city = req.body.city;
  var contact = req.body.contact;
  let updateBranch = {
    address: address,
    state: state,
    city: city,
    phone: contact,
    tutionId: req.session.admin.tutionId,
  };
  Branch.updateOne({ _id: branchId }, { $set: updateBranch })
    .then((resault) => {
      res.redirect("/manageBranch");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/manageStudent", (req, res, next) => {
  Student.find({ studentActive: 1 }).populate("branchId").populate("tutionId")
    .then((students) => {
      res.render("manageStudent", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, students: students });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/addStudent", (req, res, next) => {
  Branch.find({ branchActive: 1 })
    .then((branches) => {
      res.render("addStudent", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, branches: branches });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addStudent", upload.single('photo'), (req, res, next) => {
  let name = req.body.name;
  let fatherName = req.body.fatherName;
  let motherName = req.body.motherName;
  let sex = req.body.sex;
  let phone = req.body.phone;
  let email = req.body.email;
  let password = req.body.password;
  let std = req.body.std;
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let totalFee = req.body.totalFee;
  let paidFee = req.body.paidFee;
  let branchId = req.body.branchId;
  let tutionId = req.session.admin.tutionId;
  let photo = "/upload_files/" + req.file.originalname;
  const addStudent = new Student({
    name: name,
    fatherName: fatherName,
    matherName: motherName,
    sex: sex,
    phone: phone,
    email: email,
    password: password,
    std: std,
    address: address,
    state: state,
    city: city,
    totalFees: totalFee,
    paidFees: paidFee,
    branchId: branchId,
    tutionId: tutionId,
    photo: photo,
  });
  addStudent.save()
    .then((resaults) => {
      res.redirect("/manageStudent");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/deleteStudent/:studentId", (req, res, next) => {
  var studentId = req.params.studentId;
  var deleteStudent = {
    studentActive: 0,
  };
  Student.updateOne({ _id: studentId }, { $set: deleteStudent })
    .then((deleteStudent) => {
      res.redirect("/manageStudent");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/updateStudent", (req, res, next) => {
  var student = req.flash("student");
  var male;
  var female;
  if (student[0].sex == 'male') {
    male = student[0].sex;
  } else if (student[0].sex == 'female') {
    female = student[0].sex;
  } else {
    male = null;
    female = null;
  }
  Branch.find({ branchActive: 1 })
    .then((branches) => {
      res.render("updateStudent", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, student: student[0], male: male, female: female, branches: branches });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/updateStudent/:studentId", (req, res, next) => {
  var studentId = req.params.studentId;
  Student.find({ _id: studentId })
    .then((student) => {
      req.flash("student", student);
      res.redirect("/updateStudent");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/updateStudent", (req, res, next) => {
  var studentId = req.body.studentId;
  var name = req.body.name;
  var fatherName = req.body.fatherName;
  var matherName = req.body.motherName;
  var sex = req.body.sex;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var std = req.body.std;
  var address = req.body.address;
  var state = req.body.state;
  var city = req.body.city;
  var totalFee = req.body.totalFee;
  var paidFee = req.body.paidFee;
  var branchId = req.body.branchId;
  var tutionId = req.session.admin.tutionId;
  let updateStudent = {
    name: name,
    fatherName: fatherName,
    matherName: matherName,
    sex: sex,
    phone: phone,
    email: email,
    password: password,
    std: std,
    address: address,
    state: state,
    city: city,
    totalFees: totalFee,
    paidFee: paidFee,
    tutionId: tutionId,
    branchId: branchId,
  };
  Student.updateOne({ _id: studentId }, { $set: updateStudent })
    .then((students) => {
      res.redirect("/manageStudent");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/manageStaff", (req, res, next) => {
  Staff.find({ staffActive: 1 }).populate("branchId").populate("tutionId")
    .then((resault) => {
      res.render("manageStaff", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, staffs: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/addStaff", (req, res, next) => {
  Branch.find({ branchActive: 1 }).then((branches) => {
    res.render("addStaff", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, branches: branches });
  }).catch((err) => {
    console.log(err);
  });
});
router.post("/addStaff", upload.single('photo'), (req, res, next) => {
  let name = req.body.name;
  let middleName = req.body.middleName;
  let sex = req.body.sex;
  let phone = req.body.phone;
  let email = req.body.email;
  let qualifaction = req.body.qualifaction;
  let password = req.body.password;
  let totalSalary = req.body.totalSalary;
  let paidSalary = req.body.paidSalary;
  let exp = req.body.exp;
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let type = req.body.type;
  let tutionId = req.session.admin.tutionId;
  let branchId = req.body.branchId;
  let photo = "/upload_files/" + req.file.originalname;
  let addStaff = new Staff({
    name: name,
    middleName: middleName,
    sex: sex,
    phone: phone,
    email: email,
    qualifaction: qualifaction,
    password: password,
    totalSalary: totalSalary,
    paidSalary: paidSalary,
    exp: exp,
    address: address,
    state: state,
    city: city,
    type: type,
    tutionId: tutionId,
    branchId: branchId,
    photo: photo
  });
  addStaff.save()
    .then((resaults) => {
      res.redirect("/manageStaff");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/deleteStaff/:staffId", (req, res, next) => {
  var staffId = req.params.staffId;
  var deleteStaff = {
    staffActive: 0,
  };
  Staff.updateOne({ _id: staffId }, { $set: deleteStaff })
    .then((deleteStaff) => {
      res.redirect("/manageStaff");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/updateStaff", (req, res, next) => {
  let staff = req.flash('staff');
  var male;
  var female;
  if (staff[0].sex == 'male') {
    male = staff[0].sex;
  } else if (staff[0].sex == 'female') {
    female = staff[0].sex;
  } else {
    male = null;
    female = null;
  }
  Branch.find({ branchActive: 1 }).then((resault) => {
    res.render("updateStaff", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, staff: staff[0], male: male, female: female, branches: resault });
  }).catch((err) => {
    console.log(err);
  });
});

router.get("/updateStaff/:staffId", (req, res, next) => {
  let staffId = req.params.staffId;
  Staff.find({ _id: staffId }).then((staffs) => {
    req.flash('staff', staffs);
    res.redirect("/updateStaff");
  }).catch((err) => {
    console.log(err);
  });
});
router.post("/updateStaff", (req, res, next) => {
  let name = req.body.name;
  let staffId = req.body.staffId;
  let middleName = req.body.middleName;
  let sex = req.body.sex;
  let phone = req.body.phone;
  let email = req.body.email;
  let qualifaction = req.body.qualifaction;
  let password = req.body.password;
  let totalSalary = req.body.totalSalary;
  let paidSalary = req.body.paidSalary;
  let exp = req.body.exp;
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let type = req.body.type;
  let tutionId = req.session.admin.tutionId;
  let branchId = req.body.branchId;
  let updateStaff = {
    name: name,
    middleName: middleName,
    sex: sex,
    phone: phone,
    email: email,
    qualifaction: qualifaction,
    password: password,
    totalSalary: totalSalary,
    paidSalary: paidSalary,
    exp: exp,
    address: address,
    state: state,
    city: city,
    type: type,
    tutionId: tutionId,
    branchId: branchId,
  };
  Staff.updateOne({ _id: staffId }, { $set: updateStaff })
    .then((updateStaffs) => {
      res.redirect("/manageStaff");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/manageExpenses", (req, res, next) => {
  Expenses.find({ expensesActive: 1 }).populate("branchId").populate("tutionId")
    .then((resault) => {
      res.render("manageExpenses", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, expenses: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/addExpenses", (req, res, next) => {
  Branch.find({ branchActive: 1 }).
    then((resault) => {
      res.render("addExpenses", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, branches: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addExpenses", (req, res, next) => {
  let expenses = req.body.expenses;
  let amount = req.body.amount;
  let remark = req.body.remark;
  let branchId = req.body.branchId;
  let tutionId = req.session.admin.tutionId;
  let addExpenses = new Expenses({
    expenses: expenses,
    amt: amount,
    remark: remark,
    branchId: branchId,
    tutionId: tutionId,
  });
  addExpenses.save()
    .then((resault) => {
      res.redirect("/manageExpenses");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/deleteExpenses/:expensesId", (req, res, next) => {
  let expensesId = req.params.expensesId;
  let deleteExpenses = {
    expensesActive: 0,
  };
  Expenses.updateOne({ _id: expensesId }, { $set: deleteExpenses })
    .then((resault) => {
      res.redirect("/manageExpenses");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/updateExpenses", (req, res, next) => {
  let expense = req.flash('expense');
  Branch.find({ branchActive: 1 })
    .then((resault) => {
      res.render("editExpenses", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, expense: expense[0], branches: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/updateExpenses/:expensesId", (req, res, next) => {
  var expensesId = req.params.expensesId;
  Expenses.find({ _id: expensesId })
    .then((expense) => {
      req.flash('expense', expense);
      res.redirect("/updateExpenses");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateExpenses", (req, res, next) => {
  let expenses = req.body.expenses;
  let amount = req.body.amount;
  let remark = req.body.remark;
  let branchId = req.body.branchId;
  let tutionId = req.session.admin.tutionId;
  let expensesId = req.body.expensesId;

  let updateExpenses = {
    expenses: expenses,
    amt: amount,
    remark: remark,
    branchId: branchId,
    tutionId: tutionId,
  };
  Expenses.updateOne({ _id: expensesId }, { $set: updateExpenses }).then((resault) => {
    res.redirect("/manageExpenses");
  }).catch((err) => {
    console.log(err);
  });
});
router.get("/attendense", (req, res, next) => {
  Attendense.find({ attendenseActive: 1 }).populate("studentId").populate("tutionId")
    .then((resault) => {
      res.render("attendense", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, students: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/addAttendense", (req, res, next) => {
  Student.find({ studentActive: 1 })
    .then((resault) => {
      res.render("addAttendense", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, students: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addAttendense", (req, res, next) => {
  let date = req.body.customDate;
  let attendense = req.body.attendense;
  let type = req.body.type;
  let studentId = req.body.studentId;
  let tutionId = req.session.admin.tutionId;
  let addAttendense = new Attendense({
    date: date,
    attendense: attendense,
    type: type,
    studentId: studentId,
    tutionId: tutionId,
  });
  addAttendense.save()
    .then((resault) => {
      res.redirect("/attendense");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/marks", (req, res, next) => {
  Mark.find({}).populate("studentId")
    .then((resault) => {
      res.render("marks", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, marks: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/addMark", (req, res, next) => {
  Student.find({ studentActive: 1 })
    .then((resault) => {
      res.render("addMark", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, students: resault });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addMark", (req, res, next) => {
  let eng = req.body.eng;
  let gramer = req.body.gramer;
  let maths = req.body.maths;
  let sci = req.body.sci;
  let ss = req.body.ss;
  let env = req.body.env;
  let gk = req.body.gk;
  let hindi = req.body.hindi;
  let computer = req.body.computer;
  let guj = req.body.guj;
  let studentId = req.body.studentId;
  let addMark = new Mark({
    eng1: eng,
    gramer: gramer,
    maths: maths,
    sci: sci,
    ss: ss,
    env: env,
    gk: gk,
    hindi: hindi,
    computer: computer,
    guj: guj,
    studentId: studentId,
  });
  addMark.save()
    .then((resault) => {
      res.redirect("/marks");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fees", (req, res, next) => {
  Fees.find({}).populate("branchId").populate("tutionId").populate("studentId")
  .then((resault)=>{
    res.render("fees", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email,fees:resault });
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.get("/addFees", (req, res, next) => {
  Student.find({ studentActive: 1 })
    .then((resault) => {
      Branch.find({ branchActive: 1 }).then((branches) => {
        res.render("addFees", { title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email, students: resault, branches: branches });
      }).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addFees", (req, res, next) => {
  let date = req.body.date;
  let amount = req.body.amount;
  let tutionId = req.session.admin.tutionId;
  let studentId = req.body.studentId;
  let branchId = req.body.branchId;
  let addFees = new Fees({
    date: date,
    amt: amount,
    tutionId: tutionId,
    studentId: studentId,
    branchId: branchId,
  });
  addFees.save()
  .then((resault)=>{
    res.redirect("/fees");
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.get("/salary",(req,res,next)=>{
  Salary.find({}).populate("branchId").populate("staffId").populate("tutionId")
  .then((resaults)=>{
    res.render("salary",{title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email,resaults:resaults});
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.get("/addSalary",(req,res,next)=>{
  Branch.find({branchActive : 1})
  .then((branches)=>{
    Staff.find({staffActive : 1})
    .then((staffs)=>{
      res.render("addSalary",{title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email,staffs:staffs,branches:branches});
    })
    .catch((err)=>{
      console.log(err);
    });
  }).
  catch((err)=>{
console.log(err);
  });
});
router.post("/addSalary",(req,res,next)=>{
  let date = req.body.date;
  let amount = req.body.amount;
  let total= req.body.total;
  let tutionId = req.session.admin.tutionId;
  let staffId = req.body.staffId;
  let branchId = req.body.branchId;
  let addSalary = new Salary({
    date : date,
    amt : amount,
    total : total,
    tutionId : tutionId,
    staffId : staffId,
    branchId : branchId,
  });
  addSalary.save()
  .then((resault)=>{
res.redirect("/salary");
  })
  .catch((err)=>{
console.log(err);
  });
});
router.get("/reports",(req,res,next)=>{
  res.render("reports",{title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email});
});
router.get("/searchSalary",(req,res,next)=>{
  var total = 0;
  Salary.find({}).populate("tutionId").populate("branchId").populate("staffId")
  .then((salaries)=>{
    for(var x = 0 ; x < salaries.length;x++)
    {
      total += salaries[x].total;
    }
    res.render("searchSalary",{title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email,salaries:salaries,total:total});
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.post("/searchSalary",(req,res,next)=>{
  var date1 = Date.parse(req.body.date1);
  var date2 = Date.parse(req.body.date2);
  var total = 0;
  Salary.find({}).populate("tutionId").populate("branchId").populate("staffId")
  .then((salaries)=>{
    var dateBetweenToClander = [];
    for(let x= 0;x<salaries.length;x++)
    {
      if(Date.parse(salaries[x].date) >= date1 && Date.parse(salaries[x].date) <= date2)
      {
        total += salaries[x].total;
        dateBetweenToClander.push(salaries[x]);
      }
    }
      res.render("searchSalary",{title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email,salaries:dateBetweenToClander,total:total});
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.get("/profile",(req,res,next)=>{
  Admin.find({tutionId:req.session.admin.tutionId,email:req.session.admin.email}).populate("tutionId")
  .then((adminsTution)=>{
    Branch.find({branchActive:1})
    .then((branches)=>{
      var countBranches = 0;
      for(let x = 0 ; x < branches.length;x++){
        countBranches++;
      }
      Staff.find({staffActive:1})
      .then((staffs)=>{
        var countStaffs = 0;
        for(let x = 0 ; x < staffs.length;x++){
          countStaffs++;
        }
        Student.find({studentActive :1})
        .then((students)=>{
          var countStudent = 0;
          for(let x = 0 ; x < students.length;x++){
            countStudent++;
          }
          res.render("profile",{title: 'Studient Education', layout: 'adminLayout', adminEmail: req.session.admin.email,tutionId:adminsTution[0].tutionId._id,name:adminsTution[0].tutionId.name,tageLine:adminsTution[0].tutionId.tageLine,address:adminsTution[0].tutionId.address,phone:adminsTution[0].tutionId.phone,adminId:adminsTution[0]._id,fName:adminsTution[0].fName,lName:adminsTution[0].lName,phoneAdmin:adminsTution[0].phone,email:adminsTution[0].email,addressAdmin:adminsTution[0].address,countBranches:countBranches,countStaffs:countStaffs,countStudent:countStudent});
        })
        .catch((err)=>{
          console.log(err);
        });
      })
      .catch((err)=>{
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  })
  .catch((err)=>{
    console.log(err);
  });
});
router.post("/profile",(req,res,next)=>{
var name = req.body.name;
var tutionId = req.body.tutionId;
var tageLine = req.body.tageLine;
var email = req.body.email;
var address = req.body.address;
var phone = req.body.mobile;
var updateTution = {
name:name,
tageLine:tageLine,
email:email,
address:address,
phone:phone,
};
var fName = req.body.fName;
var adminId = req.body.adminId;
var lName = req.body.lName;
var emailAdmin = req.body.emailAdmin;
var addressAdmin = req.body.addressAdmin;
var phoneAdmin = req.body.phoneAdmin;
let updateAdmin = {
  fName:fName,
  lName:lName,
  email:emailAdmin,
  address:addressAdmin,
  phone:phoneAdmin,
};
Tution.updateOne({_id:tutionId},{$set:updateTution})
.then((tutionUpdated)=>{
Admin.updateOne({_id:adminId},{$set:updateAdmin})
.then((adminUpdated)=>{
  res.redirect("/profile");
})
.catch((err)=>{
  console.log(err);
});
})
.catch((err)=>{
console.log(err);
});
});

router.get("/logout",(req,res,next)=>{
req.session.destroy();
res.redirect("/");
});
router.post("/addNotice",(req,res,next)=>{
var noticeTitle = req.body.noticeTitle;
var noticeBody = req.body.noticeBody;
var recipient = req.body.recipient;
let tutionId = req.session.admin.tutionId;
let addNotice = new Notice({
  noticeHead : noticeTitle,
  noticeBody : noticeBody,
  recipient : recipient,
  tutionId : tutionId,
});
addNotice.save()
.then((resault)=>{
  res.redirect("/dashboard");
})
.catch((err)=>{
  console.log(err);
});
});
module.exports = router;
