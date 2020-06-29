var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3306);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(session({ resave: true, saveUninitialized: true, 
                      secret: 'uwotm8' }));

    // parse application/json
    app.use(bodyParser.json());                        

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // parse multipart/form-data
    app.use(multer());

    app.use(express.static(path.join(__dirname, 'public')));


app.set('mysql', mysql);
app.use('/workers', require('./workers.js'));
app.use('/products', require('./products.js'));
app.use('/customers', require('./customers.js'));
app.use('/locations', require('./locations.js'));
app.use('/sections', require('./sections.js'));
app.use('/customersproducts', require('./customersproducts.js'));
app.use('/', express.static('public'));

app.get('/',function(req,res) {
	res.render('home');
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

