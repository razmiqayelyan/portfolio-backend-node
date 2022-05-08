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
app.use(express.static(__dirname + "public"))
const myLogger = function (req, res, next) {
  if(req.method === 'get'){
    if(priv === false){
      res.redirect('public/index.html')
    }
  }
  next()
}

app.use(myLogger)

let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 


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

