var express = require('express');
var app = express();
var fs = require("fs");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'vasu'
  });

app.get('/getCustomers', function (req, res) {
    connection.query('SELECT * FROM customers', (err,rows) => {
        if(err) throw err;
        console.log(rows);
        res.end( JSON.stringify(rows) );
    });
})

app.post('/addCustomer', function (req, res) {
    connection.query('INSERT INTO customers SET ?', {name:"Mack",age:"27",sal:"27000",address:"Spain",qualification:"MCA",is_married:"N",gender:"M"}, (err, res) => {
        if(err) throw err;
        else console.log("Row is inserted...");
        //res.send("Row is inserted...");
      });
 })

 app.put('/updateCustomer', function (req, res) {
    var sql ="UPDATE customers SET name=?, age=?, sal=?, address=?, qualification=?, is_married=?, gender=? WHERE customer_id=?";
    connection.query(sql, ["Mike", "29", "29000", "Sweden", "MCA", "Y", "M", 27], (err, res) => {
        if(err) throw err;
        else console.log("Row is updated...");
        //res.send("Row is inserted...");
      });
 })

 app.delete('/deleteCustomer', function (req, res) {
    var sql ="DELETE from customers WHERE customer_id=?";
    connection.query(sql, [26], (err, res) => {
        if(err) throw err;
        else console.log("Row is deleted...");
        //res.send("Row is deleted...");
      });
 })

var server = app.listen(8081, function () {
   var host = "localhost"
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})