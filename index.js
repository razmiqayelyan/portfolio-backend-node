import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()


const priv = true 

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(__dirname + "/public"))


let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 
app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.post('/', (req, res) => {
  if(req.body.value === 'only-for-syom'){
    priv = false
  }
 
    res.redirect('/')
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

