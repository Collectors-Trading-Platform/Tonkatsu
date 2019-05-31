module.exports = function(){
    var express = require('express');
    var router = express.Router();

// get sections
function getSection(res, mysql, context, complete){
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

// get locations
function getLocation(res, mysql, context, complete){
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




function getWorkers(res, mysql, context, complete){
        mysql.pool.query("SELECT wid, wFirstName, wLastName, job, email, birthday, locations.city AS locationname, location, sections.sname AS sectionname, wSection from workers INNER JOIN locations ON location = locations.lid INNER JOIN sections ON wSection = sections.sid", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.workers = results;
            complete();
        });
}

// get specific worker
function getWorker1(res, mysql, context, wid, complete) {
        var sql = "SELECT wid, wFirstName, wLastName, job, email, birthday, locations.city AS locationname, location, sections.sname AS sectionname, wSection from workers INNER JOIN locations ON location = locations.lid INNER JOIN sections ON wSection = sections.sid WHERE wid= ?";
        var inserts = [wid];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.workers = results[0];
            complete();
        });
    }





  /*Display all workers. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["./deleteWorker.js"];
        var mysql = req.app.get('mysql');
        getWorkers(res, mysql, context, complete);
        getLocation(res, mysql, context, complete);
	getSection(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('workers', context);
            }

        }
    });


// add worker
router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');

var sql = "INSERT INTO workers (wFirstName, wLastName, job, email, birthday, location, wSection) VALUES  (?,?,?,?,?,(select lid from locations where lid = ?),(select sid from sections where sid = ?))";
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



   /* Display one worker for the specific purpose of updating a worker */

router.get('/:wid', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedsection.js", "selectedlocation.js", "updateworker.js"];
        var mysql = req.app.get('mysql');
        getWorker1(res, mysql, context, req.params.wid, complete);
        getSection(res, mysql, context, complete);
        getLocation(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3)
            {
                res.render('update-worker', context);
            }
        }
    });


 /* The URI that update data is sent to in order to update a worker */
 router.put('/:wid', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE workers SET wFirstName=?, wLastName=?, job=?, email=?, location=(SELECT lid FROM locations WHERE lid = ?), wSection=(SELECT sid FROM sections WHERE sid = ?) WHERE wid=?";
        var inserts = [req.body.wFirstName, req.body.wLastName, req.body.job, req.body.email, req.body.location, req.body.wSection, req.params.wid];
        sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            } else {
                res.status(200);
                res.end();
                console.log("Updated worker");
            }
        });
    });


return router;
}();

