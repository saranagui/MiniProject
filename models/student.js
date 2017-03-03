var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
let Project = require('../models/Project');


//User Schema
var StudentSchema = mongoose.Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique:true
  },
  password:{
    type: String,
    required: true
  },
  studentProjects: []
});
var Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports = Student;

module.exports.getStudentById = function(id, callback){
  Student.findById(id, callback);
},

module.exports.getStudentByUsername = function(username, callback){
var query = {username: username}
  Student.findOne(query, callback);
},

module.exports.addStudent = function(newStudent, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newStudent.password, salt, (err, hash) => {
      newStudent.password = hash;
      newStudent.save(callback);
    });
  });
},

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getAllProjects = function(req, res){

    studentProjects.find(function(err, projects){

        if(err)
            res.send(err.message);
        else
            res.render('addWork', {projects});
    });
};

module.exports.getTopProjects = function(req, res){


    studentProjects.find(function(err, projects){

        if(err)
            res.send(err.message);
        else
        {
          if(studentProjects[0]!=null)
            if(studentProjects[1]!=null)
              res.send((projects[0]).title+", "+(projects[1]).title);
            else
              res.send((projects[0]).title);
          else {
            res.send("");
          }
        }

    });
};
