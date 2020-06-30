var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));


app.set('port', process.env.PORT || 5000);
app.set('mysql', mysql);
app.use('/workers', require('./workers.js'));
app.use('/products', require('./products.js'));
app.use('/customers', require('./customers.js'));
app.use('/locations', require('./locations.js'));
app.use('/sections', require('./sections.js'));
app.use('/customersproducts', require('./customersproducts.js'));
app.use('/', express.static('public'));

app.get('/:1',function(req,res) {
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

app.listen(app.get('port'), () => {
  console.log('Express started on esave.herokuapp.com:' + app.get('port') + '; press Ctrl-C to terminate.');
});
