module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT pid, pName, price, pSection, quantity from productstable",
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



  /* Display one product for the specific purpose of updating a product */

router.get('/:pid', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateproduct.js"];
        var mysql = req.app.get('mysql');
        getProducts1(res, mysql, context, req.params.pid, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.render('update-product', context);
            }
        }
    });


 /* The URI that update data is sent to in order to update a product */
 router.put('/:pid', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE productstable SET pName=?, price=?, pSection=?, quantity=? WHERE pid=?";
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









// add product

router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO productstable (pName, price, pSection, quantity) VALUES  (?, ?, (select sid from sections where sname = 'Toys'), ?)";
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
return router;
}();

