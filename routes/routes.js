const express = require("express");
const router = express.Router();
const Student = require('../models/student');
const faculty = require('../models/faculty')
const multer = require('multer');
const student = require("../models/student");

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: storage,
}).single("image");

router.post('/addStudent', upload, (req, res) => {
  const newStudent = new student({
    name: req.body.name,
    registor_no: req.body.registor_no,
    dept: req.body.department,
    section: req.body.sec,
    year: req.body.Year,
    semester: req.body.sem,
    dob: req.body.dob,
    address: req.body.Address,
    mobile_no: req.body["mob-no"],
    fees: req.body.fees,
    attendance: req.body.attendance,
    image: req.file.filename,
    roll_no:req.body.roll_no,
    password: req.body.password
  });
  newStudent.save()
    .then(() => {
      req.session.message = {
        type: 'success',
        message: 'Student Details Saved Successfully'
      };
      res.redirect('/edit_student');
    })
    .catch((err) => {
      res.json({ message: err.message, type: 'danger' });
    });
});

router.post('/addfaculty', upload, (req, res) => {
  const newFaculty = new faculty({
    name: req.body.name,
    department: req.body.department,
    faculty_id:req.body.faculty,
    qualification: req.body.qualification,
    joined: req.body.joined,
    experience: req.body.experience,
    dob: req.body.dob,
    mobile_no: req.body["mob-no"],
    address: req.body.address,
    attendance: req.body.attendance,
    password:req.body.password,
    image: req.file.filename
  });
  newFaculty.save()
    .then(() => {
      req.session.message = {
        type: 'success',
        message: 'facuty Details Saved Successfully'
      };
      res.redirect('/edit_faculty');
    })
    .catch((err) => {
      res.json({ message: err.message, type: 'danger' });
    });
});


router.get('/', (req, res) => {
  res.render('index', { title: 'CAHCET LOGIN' });
});

router.get('/add_student', (req, res) => {
  res.render('addStudent', { title: 'Add Student' });
});

router.get('/add_faculty', (req, res) => {
  res.render('addfaculty', { title: 'Add Faculty' });
});

router.get('/student-login', (req, res) => {
  res.render('student-login', { error: req.query.error });
});


router.get('/faculty-login', (req, res) => {
  res.render('faculty-login', { error: req.query.error });
});

router.get('/admin', (req, res) => {
  let error = req.query.error;
  res.render('admin', { error: error });
});


router.get('/edit_faculty', (req, res) => {
  faculty.find().then(faculties => {
    res.render('edit-faculty', {
      title: 'Edit Faculty',
      faculties: faculties
    });
  }).catch(err => {
    res.json({ message: err.message });
  });
});

router.get('/edit_student', (req, res) => {
  student.find().then(students => {
    res.render('edit-student', {
      title: 'Edit Students',
      students: students
    });
  }).catch(err => {
    res.json({ message: err.message });
  });
});


router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const students = await student.findById(id).exec();
    if (!students) {
      res.redirect('/edit_student');
    } else {
      res.render('editingstudent',{
        student:students
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get('/editfac/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const faculties = await faculty.findById(id).exec();
    if (!faculties) {
      res.redirect('/edit_faculty');
    } else {
      res.render('editingfaculty',{
        faculty:faculties
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});



router.post("/update/:id", upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_image = "";

    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }

    const updatedStudent = await student.findByIdAndUpdate(id, {
      name: req.body.name,
      registor_no: req.body.registor_no,
      dept: req.body.department,
      section: req.body.sec,
      year: req.body.Year,
      semester: req.body.sem,
      dob: req.body.dob,
      address: req.body.Address,
      mobile_no: req.body["mob-no"],
      fees: req.body.fees,
      roll_no:req.body.roll_no,
      attendance: req.body.attendance,
      password: parseInt(req.body.password),
      image: new_image,
    });

    if (!updatedStudent) {
      res.redirect("/edit_student");
    } else {
      req.session.message = {
        type: "success",
        message: "user updated successfully",
      };
      res.redirect("/edit_student");
    }
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
});

router.post("/updatee/:id", upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_image = "";

    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }

    const updatedFaculty = await faculty.findByIdAndUpdate(id, {
    name: req.body.name,
    department: req.body.department,
    faculty_id:req.body.faculty,
    qualification: req.body.qualification,
    joined: req.body.joined,
    experience: req.body.experience,
    dob: req.body.dob,
    mobile_no: req.body["mob-no"],
    address: req.body.address,
    attendance: req.body.attendance,
    password:req.body.password,
    image: new_image,
    });

    if (!updatedFaculty) {
      res.redirect("/edit_faculty");
    } else {
      req.session.message = {
        type: "success",
        message: "user updated successfully",
      };
      res.redirect("/edit_student");
    }
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
});


router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await student.findByIdAndRemove(id).exec();
    if (result.image != "") {
      try {
        fs.unlinkSync("./uploads/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }
    req.session.message = {
      type: "info",
      message: "Student deleted successfully",
    };
    res.redirect("/edit_student");
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/deletee/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await faculty.findByIdAndRemove(id).exec();
    if (result.image != "") {
      try {
        fs.unlinkSync("./uploads/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }
    req.session.message = {
      type: "info",
      message: "faculty deleted successfully",
    };
    res.redirect("/edit_faculty");
  } catch (err) {
    res.json({ message: err.message });
  }
});


router.post('/admin', (req, res) => {
  let admin_id = req.body['admin-id'];
  let password = req.body.password;

  if (admin_id == 12032003) {
    if (password == 14032003) {
      router.get('/admin-office',(req,res)=>{
        res.render('admin-info')
      });
      res.redirect('/admin-office');
    } else {
      res.redirect('/admin?error=Wrong Password');
    }
  } else {
    res.redirect('/admin?error=Wrong admin id');
  }
});

router.post('/student-login', async (req, res) => {
  const roll_no = req.body['roll_no'];
  const password = req.body.password;

  const students = await student.findOne({roll_no : roll_no }).exec();

  if (students) {
    if (students.password == password) {
      req.session.students = students; // Store the logged-in faculty's details in the session
      console.log(req.session.students); // Add this line to check if the session is being properly stored
      res.redirect('/studentinfo');
    } else {
      res.redirect('/student-login?error=Wrong Password');
    }
  } else {
    res.redirect('/student-login?error=Invalid Roll No');
  }
});


router.get('/studentinfo', (req, res) => {
  const student = req.session.students; // Retrieve the logged-in faculty's details from the session
  console.log(student); // Add this line to check if the session variable is being properly retrieved
  res.render('studentinfopage', {
      name: student.name,
      registor_no: student.registor_no,
      dept: student.dept,
      section: student.section,
      year: student.year,
      semester: student.semester,
      dob: student.dob,
      address: student.address,
      mobile_no: student["mobile_no"],
      fees: student.fees,
      roll_no:student.roll_no,
      attendance: student.attendance,
      password:student.password,
      image:student.image,
  });
});



router.post('/faculty-login', async (req, res) => {
  const faculty_id = req.body['faculty_id'];
  const password = req.body.password;

  const faculties = await faculty.findOne({ faculty_id: faculty_id }).exec();

  if (faculties) {
    if (faculties.password == password) {
      req.session.faculties = faculties; // Store the logged-in faculty's details in the session
      res.redirect('/facultyinfo');
    } else {
      res.redirect('/faculty-login?error=Wrong Password');
    }
  } else {
    res.redirect('/faculty-login?error=Invalid Faculty ID');
  }
});

router.get('/facultyinfo', (req, res) => {
  const faculty = req.session.faculties; // Retrieve the logged-in faculty's details from the session
  res.render('facultyinfo', {
    name: faculty.name,
    department: faculty.department,
    faculty_id: faculty.faculty_id,
    qualification: faculty.qualification,
    joined: faculty.joined,
    experience: faculty.experience,
    dob: faculty.dob,
    address: faculty.address,
    mobile_no: faculty.mobile_no,
    attendance: faculty.attendance,
    image: faculty.image
  });
});








module.exports = router;
