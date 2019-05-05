var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_limjas',
  password        : '2425',
  database        : 'cs340_limjas'
});

module.exports.pool = pool;
