//add dependencies ==similar to imort in java
var express = require('express');
var path = require('path');
var cors = require('cors');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/database');

var projectRouter = require('./routes/projectRoutes');
var studentRouter = require('./routes/studentRoutes');
var studentHomeRouter = require('./routes/studentHomeRoutes');

var DB_URI = "mongodb://localhost:27017/miniproject";

var app = express();

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/views')));
app.engine('ejs',require('ejs').renderFile);
app.set('view engine', 'ejs');

//configure app
/*app.use('/', function(req, res){
  res.send("hello world!");
});

app.get('/', function(req, res, next){...});
app.post('/', function(req, res, next){...});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
//app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/',studentRouter);
app.use('/projectRoutes',projectRouter);
app.use('/studentHomeRoutes',studentHomeRouter);

//is being done by cors instead of doing it manually!!

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database '+config.database);
});

//on Error
mongoose.connection.on('error', () => {
  console.log('database error: '+err);
});

///mongoose.connect(DB_URI);
///app.use(router);
/*instead of doing the method in the server, we do it in the router.js
since we export it as Router*/

//start the server
app.listen(process.env.PORT || 8080, function(){
  console.log("server is listening on port 8080");
});
