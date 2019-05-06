var express = require('express');
var mysql = require('mysql');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var pool = mysql.createPool({
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_limjas',
	password: '2425',
	database: 'cs340_limjas'
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 44250);

app.get('/',function(req,res) {
	res.render('home');
});

var selectData = function(res, table) {
  var control = {};
  pool.query('SELECT * FROM ' + table, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    control.results = rows;
    res.send(control);
  });
};

app.get('/customers', function(req, res) {
	selectData(res, 'customerstable');      
});

app.get('/products', function(req, res) {
	selectData(res, 'productstable');
});

app.get('/workers', function(req, res) {
	selectData(res, 'workers');
});

app.get('/sections', function(req, res) {
	selectData(res, 'sections');
});

app.get('/locations', function(req, res) {
	selectData(res, 'locations');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
