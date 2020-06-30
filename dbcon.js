var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'oniddb.cws.oregonstate.edu',
  user            : 'tomki-db',
  password        : 'tomki-db',
  database        : 'Dq3vSeRCSEd7zPrW'
});
//port 3306

module.exports.pool = pool;
