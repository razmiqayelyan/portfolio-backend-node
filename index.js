import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import cors from "cors";
import path from "path"

const app = express()
let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', function(req, res){

    res.sendFile(path.join(__dirname, '/public/img.jpg'));
});

app.get('/values', (req, res) => {
     connection.query('SELECT * FROM Users', function (err, result) {
        if (err) console.log(err);
        res.send(result)
});
})



app.listen(process.env.PORT , (ok, err) =>{
    if(err) connection.end();
})

