var express = require('express');
var mysql = require('pg');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var pool = mysql.createPool({
	host: 'ec2-52-207-25-133.compute-1.amazonaws.com',
	user: 'tfoczylyskmhtl',
	password: '8ed88d7b9e016b0995155a3cfbc71114bfb8ea8f02d75f1953188564cf18728a',
	database: 'd41n2g43kclvmr'
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5432);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/', express.static('public'));

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS customerstable", function(err){
    var createString = "CREATE TABLE customerstable("+
    "cid INT PRIMARY KEY AUTO_INCREMENT,"+
    "cFirstName VARCHAR(50) NOT NULL,"+
    "cLastName VARCHAR(50) NOT NULL,"+
    "gender VARCHAR(50) NOT NULL,"+
    "hometown VARCHAR(50) NOT NULL)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('reset',context);
    })
  });
});

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT cid,cFirstName, cLastName, gender, hometown FROM customerstable", function(error, results, fields){

            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            complete();
        });
    }

router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customerstable (cFirstName, cLastName, gender, hometown) VALUES (?,?,?,?,?)";
        var inserts = [req.body.cFirstName, req.body.cLastName, req.body.gender, req.body.hometown];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customers');
            }
        });
    });


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
	res.render('customers');//selectData(res, 'customerstable');   
});

app.get('/products', function(req, res) {
	res.render('products');
});

app.get('/workers', function(req, res) {
	res.render('workers');//selectData(res, 'workers');
});

app.get('/sections', function(req, res) {
	res.render('sections');
	//selectData(res, 'sections');
});

app.get('/locations', function(req, res) {
	res.render('locations');
	//selectData(res, 'locations');
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

app.listen(process.env.PORT, function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
return router
}();
