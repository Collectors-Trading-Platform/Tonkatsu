module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getWorkers(res, mysql, context, complete){
        mysql.pool.query("SELECT wid, wFirstName, wLastName, job, email, birthday, location, wSection from workers",
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
    
router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO workers (wFirstName, wLastName, job, email, birthday, location, wSection) VALUES  (?,?,?,?,?,(select lid from locations where city = 'San Francisco'),(select sid from sections where sname = 'Checkout'))";
var inserts = [req.body.wFirstName, req.body.wLastName, req.body.job, req.body.email, req.body.birthday, req.body.location, req.body.wSection];
sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    if(error){
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
    }else{
        res.redirect('/workers');
    }
});
});
return router;
}();
