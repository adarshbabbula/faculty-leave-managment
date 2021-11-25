const express = require("express");
const router = express.Router();

const HalfDayLeave = require("../models/halfDayLeaves");
const Faculty = require("../models/faculty");
const HalfDayLeavesDate = require("../models/halfDayLeavesDate");
const Date = require("../models/halfDayLeavesDate");
const CurrentDetails = require("../models/currentDetails");

router.get("/date/:date/:month/:year", (req, res, next) => {
  HalfDayLeave.find({date: req.params.date+'/'+req.params.month+'/'+req.params.year }).populate("faculty").then((leaves) => {
    res.status(200).json({
      message: "Leaves fetched sucessfully",
      leaves: leaves,
    });
  });
});

router.get("/:facultyId", (req, res, next) => {
  HalfDayLeave.find({ faculty: req.params.facultyId }).populate("faculty").then((leaves) => {
    res.status(200).json({
      message: "Leaves fetched sucessfully",
      leaves: leaves,
    });
  });
});

// router.post("/leaves", (req, res, next) => {
//   const leave = new Leave({
//     date: req.body.date,
//     requestee: req.body.requestee,
//     assignee: req.body.assignee,
//     reason: req.body.reason,
//     status: "pending",
//   });

//   Faculty.findById(req.body.assignee).then((assignee) => {
//     if (assignee.leaves.find((leave) => leave.date == req.body.date) == -1) {
//       leave.save().then((leaveRes) => {
//         assignee.assigned.push({ leaveId: leaveRes._id, date: req.body.date });
//         assignee.save().then((assigneeRes) => {
//           Faculty.findById(req.body.requestee).then((requestee) => {
//             requestee.leaves.push({
//               leaveId: leaveRes._id,
//               date: req.body.date,
//             });
//             requestee.save().then((requesteeResult) => {
//               res.status(200).json({
//                 message: "Leave request created",
//                 leave: leaveRes,
//               });
//             });
//           });
//         });
//       });
//     }
//   });
// });

router.post("/", (req, res, next) => {
  const leave = new HalfDayLeave ({
    date: req.body.date,
    from: req.body.from,
    to: req.body.to,
    faculty: req.body.requestee,
    reason: req.body.reason,
  });
  leave.save().then((resLeave) => {
    Faculty.findById(req.body.requestee).then(faculty => {
        faculty.halfdayleaves.push(leave);
        faculty.save();
    });
    HalfDayLeavesDate.findOne({date: leave.date}).then(date=>{
      if(date==null) {
        date = new Date({ date: leave.date, halfDayLeaves: [], acceptedLeaves: 0});
        date.halfDayLeaves = [];
      }
      date.halfDayLeaves.push(leave);
      console.log(date);
      date.save().then(resDate =>{
        res.status(200).json({
          message: "Half Day Leave request created",
          leave: leave,
        });
      });
    });
  });
});

router.put("/accept", (req, res, next) => {
  HalfDayLeave.findById(req.body.leaveId).then(leave => {
      // Date.findOne({date: leave.date}).then(date => {
      //     console.log(date);
      //     if(leave.status != 'Accepted') {
      //       leave.status = 'Accepted';
      //       date.acceptedLeaves+=1;
      //     }
      //     date.save().then(resDate => {
      //       leave.save().then(resLeave => {
      //         res.status(200).json({
      //           message: "Accepted Leave",
      //           leave: resLeave
      //         });
      //       });
      //     });
      // });
      Faculty.findById(leave.faculty).then(faculty => {
          if(leave.status != 'Accepted') {
              leave.status = 'Accepted';
              faculty.acceptedHalfDayLeaves+=1;
          }
          faculty.save().then(resFaculty=> {
              leave.save().then(resLeave=> {
                res.status(200).json({
                  message: "Accepted Leave",
                  leave: resLeave
                });
              })
          });
      });
    });
});

router.put("/reject", (req, res, next) => {
  HalfDayLeave.findById(req.body.leaveId).then(leave => {
    // Date.findOne({date: leave.date}).then(date => {
    //     console.log(date);
    //     if(leave.status != 'Accepted') {
    //       leave.status = 'Accepted';
    //       date.acceptedLeaves+=1;
    //     }
    //     date.save().then(resDate => {
    //       leave.save().then(resLeave => {
    //         res.status(200).json({
    //           message: "Accepted Leave",
    //           leave: resLeave
    //         });
    //       });
    //     });
    // });
    Faculty.findById(leave.faculty).then(faculty => {
        if(leave.status == 'Accepted') {
            faculty.acceptedHalfDayLeaves-=1;
        }
        leave.status = 'Rejected';
        leave.reasonForRejection = req.body.reasonForRejection;
        faculty.save().then(resFaculty=> {
            leave.save().then(resLeave=> {
              res.status(200).json({
                message: "Rejected Leave",
                leave: resLeave
              });
            })
        });
    });
  });
});

// router.delete('/:leaveId', (req, res, next) => {
//     Leave.findById(req.params.leaveId).then(leave => {
//       Faculty.findById(leave.requestee).then(faculty => {
//           console.log(faculty.leaves);
//           faculty.leaves = faculty.leaves.filter(leaveDate => leaveDate != leave.date);
//           console.log(faculty.leaves);
//           faculty.save().then(resFaculty => {
//               Date.findOne({date: leave.date}).then(date => {
//                   console.log(date.leaves);
//                   date.leaves = date.leaves.filter(leaves => !leaves.equals(leave._id));
//                   console.log(date.leaves);
//                   date.save().then(resDate => {
//                       Leave.findByIdAndDelete(req.params.leaveId).then(result => {
//                         res.status(200).json({
//                           message: "Leave deleted",
//                         });
//                       });
//                   });
//               });
//           });
//       });
//     });
// });

router.post("/currentDetails", (req, res, next) => {
  const currentDetails = new CurrentDetails({month : 9});
  currentDetails.save();
});

module.exports = router;
