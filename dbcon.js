var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'xxxx',
  password        : 'xxxx'
  database        : 'xxxx'
});

module.exports.pool = pool;
