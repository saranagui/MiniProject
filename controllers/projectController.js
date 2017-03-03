let Project = require('../models/Project');
let Student = require('../models/student');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

let projectController = {

    getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
                res.render('addWork', {projects});
        })
    },

    getStudent:function(req, res){
      var username = req.body.username;

      Student.getStudentByUsername(username, (err, student) => {
        if(err) throw err;
        if(!student){
          res.send(err);
          return res.render('index', {});
        }
        return res.render('addWork', {student})
      })
    },

    /*getAllStudentProjects:function(req, res){

      var username = req.body.username;

      Student.getStudentByUsername(username, (err, student) => {
        if(err) throw err;
        if(!student){
          return res.render('index', {});
        }
        student.studentProjects.find(function(err, projects){
          if(err)
            res.send(err.message)
          else
            res.render('addWork', {projects})
        })
      })
    },*/

    createProject:function(req, res){
        let project = new Project(req.body);
        var username = req.body.username;
        //var password = req.body.password;

        Student.getStudentByUsername(username, (err, student) => {
          if(err) throw err;
          if(!student){
            return res.render('index', {});
          }
          /*Student.comparePassword(password, student.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){*/
              //var token = jwt.sign(student, config.secret, {
           else {
             let myStudent = student;
             if(req.body.title==''||(req.body.screenshot==''&&req.body.URL==''&&req.body.codeRepo=='')){
               return res.render('addWork', {student});
             }
             project.save(function(err, project){
               if(err){
                 console.log(err);
                 res.render('index',{});
               }
               else{
                 console.log(project);
                 var array = myStudent.studentProjects;
                 console.log(array);
                 array.push(project);
                 console.log(array);
                 myStudent.update({username: username}, {$set: {studentProjects: array}});
                 myStudent.save(function(err, student){
                   if(err){
                     console.log(err);
                     res.render('index',{});
                   }
                   else{
                     console.log(myStudent.studentProjects);
                     res.render('addWork',{student});
                   }
                 });
               }
             });
           }
             //  });
        });
    }
}

module.exports = projectController;
