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

function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT pid, pName, price, sections.sname as sectionName, pSection, quantity from productstable INNER JOIN sections ON pSection = sections.sid",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();
        });
    }

// get a specific product
function getProducts1(res, mysql, context, pid, complete){
        var sql = "SELECT pid, pName, price, pSection, quantity from productstable where pid = ?";
	var inserts = [pid];
	mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }
            context.productstable = results[0];
            complete();
        });
    }


// main page for products
router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["./deleteProduct.js"];
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
	getSection(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('products', context);
            }

        }
    });



  /* Display one product for the specific purpose of updating a product */

router.get('/:pid', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedsection.js", "updateproduct.js"];
        var mysql = req.app.get('mysql');
	getSection(res, mysql, context, complete);
        getProducts1(res, mysql, context, req.params.pid, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2)
            {
                res.render('update-product', context);
            }
        }
    });

// add product

router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO productstable (pName, price, pSection, quantity) VALUES  (?, ?, (select sid from sections where sid = ?), ?)";
var inserts = [req.body.pName, req.body.price, req.body.pSection, req.body.quantity];
sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    if(error){
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
    }else{
        res.redirect('/products');
    }
});
});


 /* The URI that update data is sent to in order to update a product */
 router.put('/:pid', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE productstable SET pName=?, price=?, pSection=(select sid from sections where sid = ?), quantity=? WHERE pid=?";	
	var inserts = [req.body.pName, req.body.price, req.body.pSection, req.body.quantity, req.params.pid];
        sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            } else {
                res.status(200);
                res.end();
                console.log("Updated product");
            }
        });
    });




  /* Route to delete a product, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM productstable WHERE pid = ?";
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

