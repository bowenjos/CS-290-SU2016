var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');

var pool = mysql.createPool({
  host : 'localhost',
  user : 'student',
  password : 'default',
  database : 'student',
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);
app.use(session:({secret:'AadfuAFh52gli2y3gk4g23ligFGILYgL'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
   res.render('nerd');
});


//To get the post and get forms woking on the same page I implemented a router from express
//The code is pretty similair to the stuff in the lecture but I made some modifications
//One of the modifications I made was to remove qParams and just add the data straight into Context
//Another modificaion I made was to add a form variable in context which modifies the header to show what type of data was incoming
//As I mentioned I implemented excpress router so that I could handle get and post on the same page
router.get('/form',function(req,res){
   var context = {};
   context.form = 'GET';
   context.dataList = [];
   for(var item in req.query){
     context.dataList.push({'name':item,'value':req.query[item]})
   }
   res.render('form-both', context);
});
router.post('/form',function(req,res){
   var context = {};
   context.form = 'POST';
   context.dataList = [];
   for (var item in req.body){
     context.dataList.push({'name':item,'value':req.body[item]})
   }
   console.log(context.dataList);
   console.log(req.body);
   res.render('form-both', context);
});

//This is the code from the lectures for using get
app.get('/form-get',function(req,res){
   var qParams = [];
   for(var p in req.query){
     qParams.push({'name':p,'value':req.query[p]})
   }
   var context = {};
   context.dataList = qParams;
   res.render('form-get', context);
});

//this is the code from the lectures for using post
app.post('/form-post',function(req,res){
   var qParams = [];
   for (var p in req.body){
     qParams.push({'name':p,'value':req.body[p]})
   }
   console.log(qParams);
   console.log(req.body);
   var context = {};
   context.dataList = qParams;
   res.render('form-post', context);
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.quary(createString, function(err){
      context.results = "Table reset";
      res.render('nerd',context);
    })
  });
});

app.get('/table',function(req,res){
   var context = {};
   

});


app.use(function(req,res){
   res.status(404);
   res.render('404page');
});

app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});
