var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'ec2-52-207-25-133.compute-1.amazonaws.com',
  user            : 'tfoczylyskmhtl',
  password        : '8ed88d7b9e016b0995155a3cfbc71114bfb8ea8f02d75f1953188564cf18728a',
  database        : 'd41n2g43kclvmr'
});

module.exports.pool = pool;
