let Project = require('../models/Project');
let Student = require('../models/student');

let studentHomeController = {
  /*  getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
              res.render('studentHome', {projects});
        })
    },*/

  /*  getStudentInfo:function(req, res){

        Student.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
              res.render('studentHome', {projects});
        })
    },
*/

    /*createProject:function(req, res){
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
              res.send(err.message)
              console.log(err);
          }
          else{

              console.log(project);
              res.redirect('/');
          }
      })
  }*/
}

module.exports = studentHomeController;
