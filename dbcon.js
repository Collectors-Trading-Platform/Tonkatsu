var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-east-02.cleardb.com',
  user            : 'b5740ca304b5bc',
  password        : 'fee9d940',
  database        : 'heroku_f8290df26fb9a01'
});
//port 3306

module.exports.pool = pool;
