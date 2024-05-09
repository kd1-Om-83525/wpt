const express = require('express');
const cors = require('cors');
const mysql=require('mysql2')
const connectionString={
host : "localhost",
port: 3306,
database : "airbnb_db",
user: "root",
password : "manager"
};
const app = express();
const secretKey="secretkey";
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors());
app.get("/users",(req,res)=>
   {
       var connection =mysql.createConnection(connectionString);
       connection.connect();
       var queryText ="select * from user";
       res.setHeader("Content-Type","application/json");
       connection.query(queryText,(err,result)=>{
           if(err==null)
            {
               res.write(JSON.stringify(result));
               connection.end();
               res.end();
            }else{
               res.write(JSON.stringify(err));
               connection.end();
               res.end();
            }
       });
   });
   
   //-------------------Registration---------------------------------
   
   app.post("/users/registration",(req,res)=>{
      var connection=mysql.createConnection(connectionString);
      connection.connect();
      var firstName=req.body.firstName;
      var lastName=req.body.lastName;
      var email=req.body.email;
      var password=req.body.password;
      var phoneNumber=parseInt(req.body.phoneNumber);
      
      const changedPassword = btoa(password);
      console.log(changedPassword);
      
      
      res.setHeader("Content-Type","application/json");
      var queryText=`insert into user (firstName,lastName,email,password,phoneNumber) values ('${firstName}','${lastName}','${email}','${password}',${phoneNumber})`;
      connection.query(queryText,(err,result)=>{
          if(err==null){
              res.write(JSON.stringify(result));
              connection.end();
              res.end();
          }else{
              res.write(JSON.stringify(err));
              connection.end();
              res.end();
          }
      });
      });
//-----------------------------Login with JWT Token------------------------------------------
app.post("/users/login", (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   const changedPassword = btoa(password);

   var connection = mysql.createConnection(connectionString);
  connection.connect();
  console.log(changedPassword);

   var queryText = `SELECT * FROM user WHERE email = '${email}' AND password = '${changedPassword}'`;
   res.setHeader("Content-Type", "application/json");
   connection.query(queryText, (err, result) => {
       if (err == null) {
           const token = jwt.sign(changedPassword,secretKey);// for


          res.write(JSON.stringify(result));
          res.write(JSON.stringify(token));
          
           connection.end();
           res.end();

       } else {
           res.query(JSON.stringify(err));
           connection.end();
           res.end();
       }
 });
});


//----------------------Insert Poerperty--------------------

app.post('/property',(req,res)=>{
   const categoryId = req.body.categoryId;
   const title = req.body.title;
   const details = req.body.details;
   const address = req.body.address;
   const contactNo = req.body.contactNo;
   const ownerName = req.body.ownerName;
   const isLakeView = req.body.isLakeView;
   const isTV = req.body.isTV;
   const isAC = req.body.isAC;
   const isWifi = req.body.isWifi;
   const isMiniBar = req.body.isMiniBar;
   const isBreakfast = req.body.isBreakfast;
   const isParking = req.body.isParking;
   const guests = req.body.guests;
   const bedrooms = req.body.bedrooms;
   const beds = req.body.beds;
   const bathrooms  =req.body.bathrooms;
   const rent = req.body.rent;
   const profileImage = req.body.profileImage;

   
  

   let connection = mysql.createConnection(connectionString);

   connection.connect();

   let queryText = `insert into property (
       categoryId,
       title,
       details,
       address,
       contactNo,
       ownerName,
       isLakeView,
       isTV,
       isAC,
       isWifi,
       isMiniBar,
       isBreakfast,
       isParking,
       guests,
       bedrooms,
       beds,
       bathrooms,
       rent,
       profileImage,
       createdTimestamp
   ) values (
       '${categoryId}',
       '${title}',
       '${details}',
       '${address}',
       '${contactNo}',
       '${ownerName}',
       ${isLakeView},
       ${isTV},
       ${isAC},
       ${isWifi},
       ${isMiniBar},
       ${isBreakfast},
       ${isParking},
       ${guests},
       ${bedrooms},
       ${beds},
       ${bathrooms},
       ${rent},
       '${profileImage}',
       CURRENT_TIMESTAMP
       
   )`;


   connection.query(queryText,(err,result)=>{
       if(!err){
           res.write(JSON.stringify(result));
           connection.end();
           res.end();
       }
       else{
           res.write(JSON.stringify(err));
           connection.end();
           res.end();
       }
       
   });
});

app.get('/property',(req,res)=>{
    let connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select * from property`;
    connection.query(queryText,(err,result)=>{
        if(!err){
            res.json(result);
            connection.end();
            res.end();
        }
        else{
            res.json(err);
            connection.end();
            res.end();
        }
    })
})

app.post('/category',(req,res)=>{
    const title = req.body.title;
    const details = req.body.details;
    const image = req.body.image;



    let connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `insert into category (title,details,image,createdTimestamp) values ('${title}','${details}','${image}',CURRENT_TIMESTAMP )`;

    connection.query(queryText,(err,result)=>{
        if(!err){
            res.json(result);
            connection.end();
        }
        else{
            res.json(err);
            connection.end();
        }
    });



});

app.listen(9999,()=>{
   console.log("Connection created Successsful");
})
