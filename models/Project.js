var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    URL:String,
    screenshot:String,
    codeRepo:String

})

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;
