const express = require("express");
const router = express.Router();

const Leave = require("../models/leave");
const Faculty = require("../models/faculty");
const Date = require("../models/date");

router.get("/",(req, res, next)=>{
  Date.find().then(dates => {
    res.status(200).json({
      message: "Dates fetched sucessfully",
      dates: dates,
    });
  })
});

router.get("/:date/:month/:year", (req, res, next) => {
  Date.findOne({ date: req.params.date+'/'+req.params.month+'/'+req.params.year }).populate("leaves").then((date) => {
    res.status(200).json({
      message: "Date fetched sucessfully",
      date: date,
    });
  });
});

module.exports = router;
