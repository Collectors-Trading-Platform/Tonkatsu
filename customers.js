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
function getCustomersWithNameLike(req, res, mysql, context, complete){
	var query = "SELECT * FROM customerstable WHERE cFirstName LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){ res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
	context.jsscripts = ["./searchcustomer.js","./filtercustomers.js", "./deleteCustomer.js"];
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
        context.jsscripts = ["./filtercustomers.js","./searchcustomer.js","./deleteCustomer.js"];
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

router.get('/search/:s', function(req, res){
  var callbackCount = 0;
        var context = {};
        context.jsscripts = ["./deleteCustomer.js","filtercustomers.js","searchcustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomersWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }
        }
    });

   /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
     //   context.jsscripts = ["selectedcustomer.js", "updatecustomer.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-customer', context);
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


    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customerstable WHERE cid = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
return router;
}();