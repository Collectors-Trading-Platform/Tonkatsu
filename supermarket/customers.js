module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT cid, cFirstName, cLastName, gender, hometown from customerstable",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customerstable = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }

        }
    });
return router;
}();

