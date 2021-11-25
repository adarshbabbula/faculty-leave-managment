const express = require("express");
const jwt = require("jsonwebtoken");

const Faculty = require("../models/faculty");
const Admin = require("../models/admin");
const CurrentDetails = require("../models/currentDetails");

const router = express.Router();

router.get("/currentDetails", (req, res, next) => {
  CurrentDetails.findOne().then(currentDetails => {
    res.status(200).json({
      message: "Current Details Fected",
      currentDetails: currentDetails
    });
  })
  // console.log('Current');
});

router.put("/currentDetails", (req, res, next) => {
  CurrentDetails.findOne().then(currentDetails => {
     currentDetails.month = req.body.month;
     currentDetails.save().then(resCurrentDetails => {
        Faculty.find().then(faculties => {
            faculties.forEach(faculty => {
                faculty.acceptedHalfDayLeaves = 0;
                faculty.halfDayLeaves = [];
                faculty.save();
            })
        });
     });
  })
  console.log('Current')
});

router.post("/login", (req, res, next) => {
  Faculty.findOne({ faculty_id: req.body.faculty_id, password: req.body.password })
    .then(user => {
      if (!user) {
            return res.status(200).json({
               message: "Auth failed",
               sucess: false
             });
      }
      const token = jwt.sign(
      { faculty_id: user.faculty_id, userId: user._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: user._id,
        sucess: true
      });
    });
  });

router.post("/admin/login", (req, res, next) => {
  Admin.findOne({ admin_id : req.body.admin_id, password: req.body.password})
  .then(user => {
    if (!user) {
          return res.status(200).json({
             message: "Auth failed",
             sucess: false
           });
    }
    const token = jwt.sign(
    { faculty_id: user.faculty_id, userId: user._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user._id,
      sucess: true
    });
  });
});
module.exports = router;
