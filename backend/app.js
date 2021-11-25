const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const leaveRoutes = require("./routes/leave");
const facultyRoutes = require("./routes/faculty");
const dateRoutes = require("./routes/date");
const authRoutes = require("./routes/auth");
const halfDayLeavesRoutes = require("./routes/halfDayLeaves");

mongoose.connect("mongodb+srv://adarsh:adarsh1B@cluster0.yqadd.mongodb.net/leaveManagement?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
      console.log("Connected to Data Base");
    })
    .catch((err)=>{
      console.log(err);
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Autherization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});
app.use('/api/faculty',facultyRoutes);
app.use('/api/leaves',leaveRoutes);
app.use('/api/dates',dateRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/halfDayLeaves',halfDayLeavesRoutes);
module.exports = app;
