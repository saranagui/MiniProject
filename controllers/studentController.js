let Student = require('../models/student');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

let studentController = {

  /*getStudentById : function(id, callback){
    Student.findById(id, callback);
  },

  getStudentByUsername : function(username, callback){
  var query = {username: username}
    Student.findById(query, callback);
  },

  addStudent : function(newStudent, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newStudent, password, salt, (err, hash) => {
        newStudent.password = hash;
        newStudent.save(callback);
      });
    });
  },

  comparePassword : function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }*/

}

module.exports = studentController;
