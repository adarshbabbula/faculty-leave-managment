const express = require("express");
const router = express.Router();

const Leave = require("../models/leave");
const Faculty = require("../models/faculty");
const Date = require("../models/date");

router.get("/date/:date/:month/:year", (req, res, next) => {
  Leave.find({date: req.params.date+'/'+req.params.month+'/'+req.params.year }).populate("requestee").then((leaves) => {
    res.status(200).json({
      message: "Leaves fetched sucessfully",
      leaves: leaves,
    });
  });
});

router.get("/:facultyId", (req, res, next) => {
  Leave.find({ requestee: req.params.facultyId }).populate("requestee").then((leaves) => {
    res.status(200).json({
      message: "Leaves fetched sucessfully",
      leaves: leaves,
    });
  });
});

router.put("/accept", (req, res, next) => {
  Leave.findById(req.body.leaveId).then(leave => {
      Date.findOne({date: leave.date}).then(date => {
          console.log(date);
          if(leave.status != 'Accepted') {
            leave.status = 'Accepted';
            date.acceptedLeaves+=1;
          }
          date.save().then(resDate => {
            leave.save().then(resLeave => {
              res.status(200).json({
                message: "Accepted Leave",
                leave: resLeave
              });
            });
          });
      });
    });
});

router.put("/reject", (req, res, next) => {
  Leave.findById(req.body.leaveId).then(leave => {
    Date.findOne({date: leave.date}).then(date => {
        console.log(date);
        if(leave.status == 'Accepted') {
          date.acceptedLeaves-=1;
        }
        leave.reasonForRejection = req.body.reasonForRejection;
        leave.status = 'Rejected';
        date.save().then(resDate => {
          leave.save().then(resLeave => {
            res.status(200).json({
              message: "Rejected Leave",
              leave: resLeave
            });
          });
        });
    });
  })
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
  const leave = new Leave({
    date: req.body.date,
    requestee: req.body.requestee,
    reason: req.body.reason,
    status: "Pending",
    type: req.body.type
  });
  leave.save().then((leave) => {
    Faculty.findById(req.body.requestee).then(faculty => {
        faculty.leaves.push(req.body.date);
        faculty.save();
    });
    Date.findOne({date: leave.date}).then(date=>{
      if(date==null) {
        date = new Date({ date: leave.date, leaves: [], acceptedLeaves: 0});
        date.leaves = [];
      }
      date.leaves.push(leave);
      console.log(date);
      date.save().then(resDate =>{
        res.status(200).json({
          message: "Leave request created",
          leave: leave,
        });
      });
    });
  });
});


router.delete('/:leaveId', (req, res, next) => {
    Leave.findById(req.params.leaveId).then(leave => {
      Faculty.findById(leave.requestee).then(faculty => {
          console.log(faculty.leaves);
          faculty.leaves = faculty.leaves.filter(leaveDate => leaveDate != leave.date);
          console.log(faculty.leaves);
          faculty.save().then(resFaculty => {
              Date.findOne({date: leave.date}).then(date => {
                  console.log(date.leaves);
                  date.leaves = date.leaves.filter(leaves => !leaves.equals(leave._id));
                  if(leave.status == 'Accepted')
                  date.acceptedLeaves-=1;
                  console.log(date.leaves);
                  date.save().then(resDate => {
                      Leave.findByIdAndDelete(req.params.leaveId).then(result => {
                        res.status(200).json({
                          message: "Leave deleted",
                        });
                      });
                  });
              });
          });
      });
    });
});
module.exports = router;
