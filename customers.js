module.exports = function(){
    var express = require('express');
    var router = express.Router();

function getHometowns(res, mysql, context, complete){
        mysql.pool.query("SELECT hometown FROM customerstable", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hometowns = results;
            complete();
        });
 }


function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT cid, cFirstName, cLastName, gender, hometown from customerstable",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
	getHometowns(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('customers', context);
            }

        }
    });
 /*Display all customers from a given hometown. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:hometown', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["./filtercustomers.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        getHometowns(res, mysql, context, complete);
        function complete(){
            callbackCount++;
	    if (callbackCount >= 2){
                res.render('customers', context);
            }
	}
    });
router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO customerstable(cFirstName, cLastName, gender, hometown) VALUES  (?,?,?,?)";
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
return router;
}();
