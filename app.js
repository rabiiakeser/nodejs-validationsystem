const express =require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');


dotenv.config({ path: './.env'});


 const app = express();
 //veritabanını bağlamak için

 const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ,
  user:  process.env.DATABASE_USER,
  password:  process.env.DATABASE_PASSWORD ,
  database: process.env.DATABASE

 });

const publicDirectory = path.join(__dirname,'/public');
console.log(__dirname);

app.use(express.static(publicDirectory));


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
      console.log(error);
    }else{
      console.log("MySQL Connected...");
    }
});

//define routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
 app.listen(5000,() => {
    console.log("Server started on Port 5000");
 })