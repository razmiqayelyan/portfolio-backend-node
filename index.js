import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors'
import bcrypt from "bcrypt";

const app = express()

app.options('*', cors())
app.use(express.json())


let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

app.get(('/'), (req, res) => {
  res.send("Welcome to my Website")
})


app.post('/register', async(req, res) => {
  const {username, email, password} = req.body
  const hashPassword = await bcrypt.hash(password, 10)
  if(!username || !email || !password){return res.send("Error")}
  const values = [
        [username, email, hashPassword , hashPassword],
      ];
  connection.query("INSERT INTO Users (username, email, password, verification_link) VALUES ?", [values], function (err, result) {
            if (err) console.log(err);
            res.send(result)
    });
})

app.post('/login', async(req,res) => {
  const  {username, password} = req.body
  const hashPassword = await bcrypt.hash(password, 10)
  connection.query("SELECT * FROM Users WHERE username=?", [username , hashPassword], function (err, result) {
    if (err) console.log(err);
    res.send(result)
});
})




app.listen(process.env.PORT , (ok, err) =>{
    if(err) connection.end();
})

