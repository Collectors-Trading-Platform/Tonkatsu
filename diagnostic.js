var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
const handlebars = require('express-handlebars');// .create({defaultLayout:'main'});

// app.use(express.logger());

var mysql = require('mysql');
var pool = mysql.createConnection({
  	host            : 'us-cdbr-east-02.cleardb.com',
 	user            : 'b5740ca304b5bc',
 	password        : 'fee9d940',
 	database        : 'heroku_f8290df26fb9a01'
});

//var connection;
//var pool;

/**
function handleDisconnect() {
    console.log('1. connecting to db:');
    //connection = mysql.createConnection(db_config); // Recreate the connection, since
    pool = mysql.createConnection(db_config);													// the old one cannot be reused.

    pool.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    pool.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();
**/
app.engine('handlebars', handlebars({
layoutsDir: __dirname + '/views/layouts'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public')); //app.use('/', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 5000);
app.set('mysql', mysql);
app.use(bodyParser.json());
//app.use('/workers', require('./workers.js'));
//app.use('/products', require('./products.js'));
app.use('/customers', require('./customers.js'));
//app.use('/locations', require('./locations.js'));
//app.use('/sections', require('./sections.js'));
//app.use('/customersproducts', require('./customersproducts.js'));
app.use('/', express.static('public'));

//app.set(process.env.PORT);

// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());



//app.get('/', function(req, res) {
//	res.render('home', {layout : 'main'});
//});
/**
function fetch(response){
    executequery('SELECT * from customerstable', function(result){
        console.log(result);
            response.write('<table><tr>');
            for (var column in result[0]){
                response.write('<td><label>' + column + <'/label></td>');
                res.write('</tr>');
            }
            for (var row in result){
                response.write('<tr>');
                for (var column in result[row]){
                    response.write('<td><label>' = result[row][column] + '</label></td>');
                }
                response.end('</table>');
            }};
    }
**/

/**
app.get('/', function(request, response) {
       connection.query('SELECT cid,cFirstName, cLastName, gender, hometown FROM customerstable', function(err, rows, fields) {
//connection.query('SELECT * FROM customerstable', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
    });
});
**/

/***
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
**/
module.exports = function(){
    var express = require('express');
    var router = express.Router();

/**
    function getCustomers(res, mysql, context, complete){
        executequery("SELECT cid,cFirstName, cLastName, gender, hometown FROM customerstable", function(error, results, fields){

            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            complete();
        });
    }
**/

/**
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

**/
	

app.get('/', function(req, res) {
	res.render('home', {layout : 'main'});
});

/**
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
**/
app.get('/customers', function(req, res) {
	res.render('customers');//selectData(res, 'customerstable');   
});
/**
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

**/

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
app.listen(port, function() {
    console.log("Listening on " + port);
});

return router
}();


