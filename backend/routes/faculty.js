const express = require("express");
const faculty = require("../models/faculty");
const router = express.Router();

const Faculty = require("../models/faculty");
const halfDayLeaves = require("../models/halfDayLeaves");
const HalfDayLeaves = require("../models/halfDayLeaves");
const Admin = require("../models/admin");

router.get("/", (req, res, next) => {
  Faculty.find().then(faculty => {
    res.status(200).json({
      message: "Faculty Details fetched sucessfully",
      faculty: faculty,
    });
  })
});

router.put("/admin/password", (req, res, next) => {
  Admin.findById(req.body.userId).then(admin => {
    admin.password = req.body.password;
    admin.save().then(resAdmin => {
      res.status(200).json({
        message: "Admin Password Changed",
        admin: resAdmin,
      });
    });
  })
});

router.put("/password", (req, res, next) => {
  Faculty.findById(req.body.userId).then(faculty => {
    faculty.password = req.body.password;
    faculty.save().then(resFaculty => {
      res.status(200).json({
        message: "Faculty Password Changed",
        faculty: resFaculty
      })
    })
  })
});

router.get("/admin/:adminId", (req, res, next) => {
  Admin.findById(req.params.adminId).then(faculty => {
    res.status(200).json({
      message: "Admin Details fetched sucessfully",
      admin: faculty,
    });
  })
});

router.get("/:facultyId", (req, res, next) => {
  Faculty.findById(req.params.facultyId).populate("halfdayleaves").then(faculty => {
    res.status(200).json({
      message: "Faulty Details fetched sucessfully",
      faculty: faculty,
    });
  })
});

router.post("/halfdayleaves",(req, res, next)=> {
  Faculty.findById(req.body.facultyId).then(faculty => {
      if(faculty.halfdayleaves>0){
        faculty.halfdayleaves-=1;
        faculty.save().then(resFaculty => {
          const halfdayleaves = new HalfDayLeaves();
          halfdayleaves.save().then(halfdayleaves=> {
            res.status(200).json({
              message: "Half day leave alloted",
              faculty: resFaculty
            });
          });
        })
      }
  });
});

router.post("/", (req, res, next) => {
   var faculty = new Faculty({ name: req.body.name, email: req.body.email, faculty_id: req.body.facultyId, phoneNo: req.body.phoneNo });
   faculty.save().then(resFaculty => {
    res.status(200).json({
      message: "Created New Faculty",
      faculty: resFaculty
    });
   });
});

router.get("/halfdayleaves/:facultyId",(req, res, next)=> {
  HalfDayLeaves.findOne(req.params.facultyId).then(halfDayLeave => {
    res.status(200).json({
      message: "Half Day leave fetched sucessfully",
      halfDayLeave: halfDayLeave
    });
  });
});

module.exports = router;
