module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT lid, city FROM locations",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations', context);
            }

        }
    });
return router;
}();



