module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT sid, sname FROM sections",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.sections = results;
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
                res.render('sections', context);
            }

        }
    });
return router;
}();

