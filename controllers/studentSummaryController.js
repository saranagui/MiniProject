let Student = require('../models/student');

let studentSummaryController = {

    getAllStudents:function(req, res){

        Student.find(function(err, students){

            if(err)
                res.send(err.message);
            else
                res.render('studentSummary', {students});
        })
    },
}

module.exports = studentSummaryController;
