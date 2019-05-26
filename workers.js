module.exports = function(){
    var express = require('express');
    var router = express.Router();

function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT lid, city FROM locations", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
 }

function getWorkers(res, mysql, context, complete){
        mysql.pool.query("SELECT wid, wFirstName, wLastName, job, email, birthday, locations.city AS location, sections.sname AS wSection from workers INNER JOIN locations ON location = locations.lid INNER JOIN sections ON wSection = sections.sid", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.workers = results;
            complete();
        });
}


function getWorkersByLocation(req, res, mysql, context, complete){
      var query = "SELECT wid, wFirstName, wLastName, job, email, birthday, locations.city AS location, sections.sname AS wSection from workers INNER JOIN sections ON wSection = sections.sid INNER JOIN locations ON location = locations.lid WHERE location = ?";
      console.log(req.params)
      var inserts = [req.params.location]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.workers = results;
            complete();
        });
}

function getWorkersWithNameLike(req, res, mysql, context, complete){
	var query = "SELECT * FROM workers WHERE wFirstName LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){ res.write(JSON.stringify(error));
                res.end();
            }
            context.workers = results;
            complete();
        });
    }  

  /*Display all workers. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["./filterworkers.js", "./deleteWorker.js"];
        var mysql = req.app.get('mysql');
        getWorkers(res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('workers', context);
            }

        }
    });

router.get('/search/:s', function(req, res){
  var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterworkers.js","searchworker.js","deleteWorker.js"];
        var mysql = req.app.get('mysql');
        getWorkersWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('workers', context);
            }
        }
    }); 
 /*Display all workers from a given location. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:location', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["./filterworkers.js", "./deleteWorker.js"];
        var mysql = req.app.get('mysql');
        getWorkersByLocation(req, res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
	    if (callbackCount >= 2){
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
  /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM workers WHERE wid = ?";
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

