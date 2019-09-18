var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({  //配置你本地的数据库
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());  //获取当前的操作时间  可以取消
  next();
});
router.get('/', function(req, res) {
  res.send('Get Data');
});
router.get('/1', function(req, res) {
    //connection.connect();
    var  sql = 'SELECT * FROM test_01 where A =5';
    console.log('ID:', req.params.id);  //搜索的ID
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
      // connection.end();
       res.send(result);
 });
});

router.get('/2', function(req, res) {
    //connection.connect();
    var  sql = 'update test_01 set B="hahaha" where A=5';
    console.log('ID:', req.params.id);  //搜索的ID
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
      // connection.end();
       res.send(result);
 });
});

router.get('/3', function(req, res) {
    //connection.connect();
    var  sql = 'delete from test_01 where A=5';
    console.log('ID:', req.params.id);  //搜索的ID
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
      // connection.end();
       res.send(result);
 });
});

router.get('/4', function(req, res) {
    //connection.connect();
    var  sql = 'INSERT INTO test_01 (A,B) VALUES (5,"xixixi")';
    console.log('ID:', req.params.id);  //搜索的ID
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
      // connection.end();
       res.send(result);
 });
});

module.exports = router;