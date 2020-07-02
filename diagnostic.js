var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
var router = express.Router();


var mysql = require('mysql');
var pool = mysql.createConnection( {
  	host            : 'us-cdbr-east-02.cleardb.com',
 	user            : 'b5740ca304b5bc',
 	password        : 'fee9d940',
 	database        : 'heroku_f8290df26fb9a01'
});

var connection;

function handleDisconnect() {
    console.log('1. connecting to :');
    connection = mysql.createConnection(pool); // Recreate the connection, since
													// the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

app.engine('handlebars', handlebars({
layoutsDir: __dirname + '/views/layouts'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public')); //app.use('/', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 5000);
app.set('mysql', mysql);
app.use('/', express.static('public'));

module.exports = function(){
    var express = require('express');
    var router = express.Router();
	

	
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


app.get('/', function(req, res) {
	res.render('home', {layout : 'main'});
	fetchData(response);
	console.log("YES! WE HAVE DONE IT");
});
	
	//functions
function executeQuery(sql, cb){
     pool.query(sql, function (error,result, fields){
        if(error) {throw error;}
        cb(result);
        })
}
	
function fetchData(response){
    executeQuery('SELECT * from customerstable', function(result){
        console.log(result);
        response.write('<table><tr>');
        for (var column in result[0]){
            response.write('<td><label>' + column + '</label></td>');
            res.write('</tr>');
        }
        for (var row in result){
            response.write('<tr>');
            for (var column in result[row]){
                response.write('<td><label>' + result[row][column] + '</label></td>');
            }
            response.end('</table>');
        }});
    }
	
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


