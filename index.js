import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use('/public', express.static(__dirname + "/public"))

let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 

app.get('/', (req,res) => {
  res.redirect('/public/index.html')
})

app.get('/values', (req, res) => {
     connection.query('SELECT * FROM Users', function (err, result) {
        if (err) console.log(err);
        res.send(result)
});
})



app.listen(process.env.PORT , (ok, err) =>{
    if(err) connection.end();
})

