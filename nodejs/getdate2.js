var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({  //�����㱾�ص����ݿ�
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });

// ��·��ʹ�õ��м��
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());  //��ȡ��ǰ�Ĳ���ʱ��  ����ȡ��
  next();
});
router.get('/', function(req, res) {
  res.send('Get Data');
});
router.get('/1', function(req, res) {
    //connection.connect();
    var  sql = 'SELECT * FROM test_01 where A =5';
    console.log('ID:', req.params.id);  //������ID
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
    console.log('ID:', req.params.id);  //������ID
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
    console.log('ID:', req.params.id);  //������ID
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
    console.log('ID:', req.params.id);  //������ID
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