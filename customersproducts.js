module.exports = function(){
    var express = require('express');
    var router = express.Router();

// get products
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

// get customers
function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT cid, cFirstName, cLastName, gender, hometown from customerstable",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }


// get customers products
function getCustomersProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT cpid, customerstable.cFirstName, customerstable.cLastName, productstable.pName, customer_id, product_id FROM customer_product INNER JOIN customerstable ON customer_id = customerstable.cid INNER JOIN productstable ON product_id = productstable.pid",
	 function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer_product = results;
            complete();
        });
    }




// main page for customersproducts
router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomerProduct.js"];
        var mysql = req.app.get('mysql');
        getCustomersProducts(res, mysql, context, complete);
	getProducts(res, mysql, context, complete);
	getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('customersproducts', context);
            }

        }
    });
    

// add a customer product
router.post('/', function(req, res){
console.log(req.body)
var mysql = req.app.get('mysql');
var sql = "INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cid = ?), (select pid from productstable where pid = ?))";
var inserts = [req.body.customer_id, req.body.product_id];
sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    if(error){
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
    }else{
        res.redirect('/customersproducts');
    }
});
});

  /* Route to delete a custoemr product, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `customer_product` WHERE  cpid = ?";
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
