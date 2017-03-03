var express = require ('express');
var Router = express.Router();
var studentHomeController = require('../controllers/studentHomeController');

//request (req) & response (res)
Router.get('studentHome',function(req, res){
  //res.send("hello world!");
});

//in studentroutes!!
/*Router.post('/portfolio',function(req, res){
  Console.log("Was rendering to addWork");
  res.render('addWork', {});
});*/
// add routes
//Router.get('studentHome', studentHomeController.getAllProjects);

//addWork was project??
//Router.post('/addProject', studentHomeController.createProject);

// export router
module.exports = Router;
