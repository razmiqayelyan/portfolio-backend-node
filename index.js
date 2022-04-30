import mysql from "mysql";
import express from 'express';
import 'dotenv/config'

let connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});
   
connection.connect();

const app = express()

app.get('/', (req, res) => {
    connection.query("SELECT * FROM Users WHERE username = 'razmikayelyan'", function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
       
})

app.get('/values', (req, res) => {
    var sql = "INSERT INTO Users (username, email, password) VALUES ('newuser', 'newuser@gmail.com', '123456')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
     res.send("OK");
    });
})

app.listen(process.env.PORT , (ok, err) =>{
    if(err) connection.end();
})

