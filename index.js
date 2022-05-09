import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors'

const app = express()

let priv = true

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use((req,res,next) => {
  if(priv === true && req.method !== 'POST'){
    res.sendFile(__dirname + '/public/html/index.html')
  }else{
    setTimeout(() => {
      priv = false
    }, 10000)
    next()
}})

app.use(cors())
app.use(express.static('public'))
app.use('/html', express.static(__dirname + "public/html"))
app.use('/js', express.static(__dirname + "public/js"))
app.use('/images', express.static(__dirname + "public/images"))
app.use(express.json())


let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 

app.get('/', (req,res) => {
  if(priv){
    res.redirect('/html/index.html')
  }else{
    res.redirect('/images/xujan-syom.jpg')
  }
})

app.post('/', (req, res) => {
  if(req.body.value === 'only-for-syom'){
    priv = false
    res.redirect('/images/syom.jpg')
  }else{
    res.redirect('/html/index.html')
  }
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

