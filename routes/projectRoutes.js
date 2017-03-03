var express = require ('express');
var Router = express.Router();
var projectController = require('../controllers/projectController');

//request (req) & response (res)
/*Router.get('/',function(req, res){
  res.send("hello world!");
});*/

// add routes
Router.get('addWorks', projectController.getAllProjects);

//addWork was project??
Router.post('/addProject', projectController.createProject);

// export router
module.exports = Router;
