import mysql from "mysql";
import express from 'express';
import 'dotenv/config';
import cors from "cors";


const app = express()
let connection = mysql.createConnection({
  host     : 'sql779.main-hosting.eu'   /*process.env.HOST*/,
  user     : 'u414743078_razo' /*process.env.USER*/,
  password : 'Kotik2001.' /*process.env.PASSWORD*/,
  database :'u414743078_razo'  /*process.env.DATABASE*/,
});
 




app.get('/', (req, res) => {
    res.send("Works Good")
       
})

app.get('/values', (req, res) => {
     connection.query('SELECT * FROM Users', function (err, result) {
        if (err) console.log(err.message);
        res.send(result)
});
})



app.listen(process.env.PORT , (ok, err) =>{
    if(err) connection.end();
})

