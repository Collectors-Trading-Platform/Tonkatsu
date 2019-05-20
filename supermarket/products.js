module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT pid, pName, price, sections.sName, quantity from productstable INNER JOIN sections ON pSection = sections.sid",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.productstable = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('products', context);
            }

        }
    });
return router;
}();

