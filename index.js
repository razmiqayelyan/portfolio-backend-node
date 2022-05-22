import mysql from "mysql2";
import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors'
import bcrypt from "bcrypt";
import { text } from "express";
import nodemailer from "nodemailer";

const app = express()


async function sendEmail(full_name,email,phone,message){

let transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

  let info = await transporter.sendMail({
    from: 'no-reply@mikayelyan.website', // sender address
    to: `${process.env.MY_EMAIL}`, // list of receivers
    subject: `${full_name}`, // Subject line
    text: "Hello Razmik,", // plain text body
    html: `</br><div>You got a new message from ${full_name},</div>
        </br><div style={border-right:"2px solid"}>${message}</div>
      </br><p>${phone}</p>
      </br><p>${email}</p>
      </br></br>
      Best Wishes,</br>
      Razos Portfolio Website
    `, // html body
  });
}


async function sendEmailtoUser(full_name,email){

  let transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });
  
    let info = await transporter.sendMail({
      from:  'no-reply@mikayelyan.website', // sender address
      to: `${email}`, // list of receivers
      subject: `Form Successfully Submited`, // Subject line
      text: `Hello ${full_name}`, // plain text body
      html: `
      <p>This letter indicates that your proposal was received successfully</p>
      `, // html body
    });
  }



app.use(cors({
  origin: process.env.ORGIN || 'http://127.0.0.1:5500'
}))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
);

const connection = mysql.createPool({
    connectionLimit : 10,
    acquireTimeout  : 10000,
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
  });


// app.get('/', async(req, res) => {
//   const result = await connection.promise().query('SELECT * FROM Users')
//   res.send(result[0])
  
// })


app.post('/contact/create', async (req, res) => {
  try{
    const {full_name, email , phone , message} = req.body
    if(!full_name || !email || !phone) return res.send("Fields are not filled")
    const result = await connection.promise().query("INSERT INTO `Contact Info` (`full_name`, `email`, `phone`, `message`) VALUES (?,?,?,?)" , [full_name, email, phone, message])
    {result && sendEmail(full_name, email , phone , message)}
    {result && sendEmailtoUser(full_name, email)}
    {result ? 
    res.send({
        id:result[0].insertId,
        full_name,
        email,
        phone,
        message:message? message : 'NULL'
    }):res.send('Please Try Again') }
  }catch(err){
    console.log(err)
    res.send("Error")
  }
})


app.post('/contact', async(req, res) => {
  if(req.body.permission !== process.env.PERMISSION) return res.send("You Dont Have Permission")
  try{  
      const result = await connection.promise().query("SELECT * FROM `Contact Info`")
      res.send(result[0])
  }catch(err){
    res.send("ERROR")
  }
})

app.get("/contact", (req, res) => {
  res.send({message: "PERMISSION ERROR"})
})

app.post('/contact/info/:ID', async(req, res) => {
  if(req.body.permission !== process.env.PERMISSION) return res.send("You Dont Have Permission")
  try{
    const id = req.params.ID  
    const result = await connection.promise().query("SELECT * FROM `Contact Info` WHERE id=? OR email=?", [id, id])
    res.send(result[0])
  }catch(err){
  res.send("ERROR")
}

})



app.listen(process.env.PORT , (ok, err) =>{
    if(err) connection.end();
})

