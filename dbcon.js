var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-east-02.cleardb.com',
  user            : 'b5b7cb5d8126ac',
  password        : 'b296bab6',
  database        : 'heroku_fd3a3a2208266f1'
});
//port 3306

module.exports.pool = pool;
