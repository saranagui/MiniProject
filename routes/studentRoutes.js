var express = require('express');
var router = express.Router();

var studentController = require('../controllers/studentController');
var projectController = require('../controllers/projectController');
var visitorController = require('../controllers/visitorController');
var studentHomeController = require('../controllers/studentHomeController');
var studentSummaryController = require('../controllers/studentSummaryController');

var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
var Student = require('../models/student');

//Register
router.post('/register', (req, res, next) => {
  console.log("was here reg");
  if(req.body.name == ""||req.body.username == ""||req.body.email == ""||req.body.password == ""||req.body.password != req.body.confirm)
  {
    res.render('index', {});
  }
  else{
      let newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        picture: req.body.picture,
        studentProjects: []
      });

      Student.addStudent(newStudent, (err, student) =>{
        if(err){
          console.log(err);
          res.render('index', {});
        }
        else{
          //res.json({success: false, msg:"Welcome aboard! Please Log in"});
          res.render('index', {});
        }
      });
    }
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  console.log("was here logging");
  Student.getStudentByUsername(username, (err, student) => {
    if(err) throw err;
    if(!student){
      //res.json({success: false, msg: 'Student not found'});
      //alert("wrong password!");
      return res.render('index', {});
    }

    Student.comparePassword(password, student.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        var token = jwt.sign(student, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.render('studentHome', {student});
      } else {
        //res.json({success: false, msg: 'Wrong password'});
        //alert("wrong password!");
        return res.render('index', {});
      }
    });
  });
});

//render
router.get('/',function(req, res){
  console.log("was here index");
  res.render('index',{});
});

/*
//Profile
router.get('/', (req, res, next) => {
  res.send({student: req.student});
});


// Profile
router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({student: req.student});
});
*/

//go to addWork!
router.get('/addWork', projectController.getStudent);
router.post('/portfolio', projectController.getStudent);
router.post('/addProject', projectController.createProject);

//go to profile!
//router.get('/studentHome', studentController.getStudentByUsername);

/*router.post('/profile',function(req, res){

    passport.authenticate('spotify', {
     failureRedirect: 'index',
     successReturnToOrRedirect: 'studentHome'
    })
  });*/
//go to visitor!
router.post('/visitorSummary',visitorController.getAllStudents);

//go to student summary!
router.post('/studentSummary',studentSummaryController.getAllStudents);

//log out
router.post('/logOut',function(req, res){
  res.render('index',{});
});

module.exports = router;
