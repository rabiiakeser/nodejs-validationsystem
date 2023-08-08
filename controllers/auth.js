const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { hash } = require("bcrypt");



const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});





exports.register = (req ,res) => {
   console.log(req.body);

  

   const { name , email, password ,passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ? ',[email]),async (error,results) => {
    if(error){
         console.log(error);
    }
    if(results.length > 0){ //her kayıt için tek bir email
        return res.render('register',{
            message :'Bu email kullanılıyor.'
        })
    } else if(password !== passwordConfirm) //şifre tekrarı kontrolü uyuşmaması durumunda ekrana gelen mesaj
    return res.render('register',{
        message :'Şifre uyuşmuyor.'
   });

   let hashedPassword = await bcrypt.hash(password , 8);
   console.log(hashedPassword);

 
   //veri ekleme
   db.query('INSERT INTO users SET ? ',{name: name, email: email, password: hashedPassword},(error,results)=> {
        if(error){
            console.log(error);

        }else{
            console.log(results);
            return res.render('register',{
                message: 'User registered'
            })
        }
   })

}
}

