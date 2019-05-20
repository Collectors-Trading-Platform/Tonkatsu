module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getWorkers(res, mysql, context, complete){
        mysql.pool.query("SELECT wid, wFirstName, wLastName, job, email, birthday, locations.city from workers INNER JOIN locations ON location = locations.lid",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.workers = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
       // context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getWorkers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('workers', context);
            }

        }
    });
return router;
}();
