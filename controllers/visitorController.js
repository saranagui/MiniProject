let Student = require('../models/student');

let visitorController = {

    getAllStudents:function(req, res){

        Student.find(function(err, students){

            if(err)
                res.send(err.message);
            else
                res.render('visitorHome', {students});
        })
    },
}

module.exports = visitorController;
