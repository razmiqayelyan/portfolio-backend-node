import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()

let priv = true

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

(req, res, next) {
 if(req.method !== 'POST' && priv === true){
   req.url = '/'
 }
  next()
}

app.use((req, res, next) => {
  console.log('LOGGED')
  next()
}
)

app.use(express.static('public'))
app.use('/images', express.static(__dirname + "public/images"))
app.use('/html', express.static(__dirname + "public/html"))
app.use('/js', express.static(__dirname + "public/js"))
app.use(express.json())




let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 

app.get('/', (req,res) => {
  res.redirect('/html/index.html')
})

app.post('/', (req, res) => {
  if(req.body.value === 'only-for-syom'){
    priv = false
    res.redirect('/images/syom.jpg')
  }
  res.redirect('/html/index.html')
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

