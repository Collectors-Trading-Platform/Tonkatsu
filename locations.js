module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getLocation(res, mysql, context, complete){
        mysql.pool.query("SELECT lid, city from locations",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }

// get specific location
function getLocations1(res, mysql, context, lid, complete){
        var sql = "SELECT lid, city FROM locations WHERE lid = ?";
	var inserts = [lid];
	mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }
            context.locations = results[0];
            complete();
        });
    }
function getLocationsWithCityLike(req, res, mysql, context, complete){
var query = "SELECT * FROM locations WHERE city LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){ res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }

 /* Display one location for the specific purpose of updating location */

router.get('/:lid', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatelocation.js"];
        var mysql = req.app.get('mysql');
        getLocations1(res, mysql, context, req.params.lid, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.render('update-location', context);
            }
        }
    });
router.get('/search/:s', function(req, res){
  var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchlocaton.js"];
        var mysql = req.app.get('mysql');
         getLocationsWithCityLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations', context);
            }
        }
    });

/* The URI that update data is sent to in order to update a location */
 router.put('/:lid', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE locations SET city=? WHERE lid=?";
        var inserts = [req.body.city, req.params.lid];
        sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            } else {
                res.status(200);
                res.end();
                console.log("Updated Location");
            }
        });
    });




router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
       // context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getLocation(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations', context);
            }

        }
    });
    
router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO locations (city) VALUES (?)";
var inserts = [req.body.city];
sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    if(error){
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
    }else{
        res.redirect('/locations');
    }
});
});


  /* Route to delete a location, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM locations WHERE lid = ?";
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
