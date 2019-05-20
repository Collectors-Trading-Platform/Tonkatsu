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

