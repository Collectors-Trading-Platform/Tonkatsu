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

function getSectionsWithNameLike(req, res, mysql, context, complete){
var query = "SELECT * FROM sections WHERE sname LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){ res.write(JSON.stringify(error));
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


// get specific section
function getSections1(res, mysql, context, sid, complete){
        var sql = "SELECT sid, sname FROM sections WHERE sid = ?";
	var inserts = [sid];
	mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }
            context.sections = results[0];
            complete();
        });
    }

   /* Display one section for the specific purpose of updating section */

router.get('/:sid', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatesection.js"];
        var mysql = req.app.get('mysql');
        getSections1(res, mysql, context, req.params.sid, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.render('update-section', context);
            }
        }
    });

router.get('/search/:s', function(req, res){
  var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchsections.js"];
        var mysql = req.app.get('mysql');
         getSectionsWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('sections', context);
            }
        }
    });
 /* The URI that update data is sent to in order to update a section */
 router.put('/:sid', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE sections SET sname=? WHERE sid=?";
        var inserts = [req.body.sname, req.params.sid];
        sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            } else {
                res.status(200);
                res.end();
                console.log("Updated Section");
            }
        });
    });


router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO sections (sname) VALUES (?)";
var inserts = [req.body.sname];
sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    if(error){
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
    }else{
        res.redirect('/sections');
    }
});
});

  /* Route to delete a section, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM sections WHERE sid = ?";
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

