const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Student = require('../models/student');
var Assistant = require('../models/assistant');
var jwt = require('jsonwebtoken');
var secret = "HarryPotter";
const jwtApi = require('express-jwt');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var emailExistence = require('email-existence');

//Sengrid account details
var options = {
  auth: {
    api_user: 'prabodha',
    api_key: 'prabodha@1994'
  }
}

const authCheck = jwtApi({
  secret: new Buffer('SHHH-SECRET', 'base64'),
  audience: 'audience'
});


//get api listening
router.get('/', (req, res) => {
  res.send('api works');
});

//http://localhost:3000/api/register ---user register route----
router.post('/register', (req, res) => {
  var user = new User();
  //setting up user details from the request
  user.username = req.body.email;
  user.password = req.body.password;
  user.email = req.body.email;
  user.user_role = req.body.userRole;

  if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "" ){
    res.json({success: false, message: "Ensure username and password and email are provided"});
  }
  else{
    user.save((err) => {
      if(err){
        res.json({success: false, message: "Username already exits"});
      }
      else{
        var token = jwt.sign({username: user.username, email: user.email, role:user.user_role}, secret, { expiresIn: '24h' });
        res.json({success: true, message: "user created", token: token});
      }
    });
  }
});

//http://localhost:3000/api/authenticate ---user login route----
router.post('/authenticate', (req, res) => {
  User.findOne({ username: req.body.username}).select('username email password user_role').exec(function(err, user){
    if(err) throw err;

    if (!user){
      res.json({success: false, message: "Username does not exits"});
    }
    else if(user){
      if (req.body.password){
        //compare password for authentication
        if(user.comparePassword(req.body.password)){
          var token = jwt.sign({username: user.username, email: user.email, role:user.user_role}, secret, { expiresIn: '24h' });
          res.json({success: true, message: "You are successfully logged in", token: token});
        }
        else{
          res.json({success: false, message: "Username and password does not match"});
        }
      }
      else{
        res.json({success: false, message: "Password must be provided"});
      }
    }
  });
});

//http://localhost:3000/api/registerStudent ---Route to register a student entered by admin or assistant----
router.post('/registerStudent', (req, res) => {
  var user = new User();
  user.username = req.body.email;

  ////password generating function
  var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //setting up user details from the request
  var password=randomString(10);
  user.password = password;
  user.email = req.body.email;
  user.user_role = req.body.userRole;

  var student = new Student;

  user.save((err) => {
    if(err){
      res.json({success: false, message: "Could not create user! The email already exits with another user"});
    }
    else{
      emailExistence.check(req.body.email , function(err,response){
        if(response){
          //sending the existance of the email
          console.log("valid email");
          var flag = false;
          var client = nodemailer.createTransport(sgTransport(options));
          var email = {
            from: 'Localhost staff,azone@localhost.com',
            to: req.body.email,
            subject: 'Account Activated',
            text: 'Hello, Your account of Azone Education Institute access has been activated. You can access the account using following username and password',
            html: 'Hello, <br><br>Your account of Azone Education Institute access has been activated.<br>You can access the online account using following username and password.<br><br>Username: '+ req.body.email+'<br>Password: '+password+'<br><br>Best Regards,<br>Azone.'
          };

          client.sendMail(email, function(err, info){
            if (err ){
              console.log(err);
              res.json({success: false ,message:"Could not create user! The Activation email couldn't sent"});
            }
            else {
              //setting up student details
              console.log('Message sent: ' + info);
              console.log(req.body);
              student.email = req.body.email;
              student.first_name = req.body.firstName;
              student.last_name = req.body.lastName;
              var address = [req.body.address1, req.body.address2, req.body.city];
              student.address = address;
              student.mobile = req.body.mobile;
              student.birthday = req.body.birthday;
              student.gender = req.body.gender;
              student.classes = req.body.classes;


              student.save((err) => {
                if(err){
                  console.log(err);
                  res.json({success: false, message: "Could not add student! Something went wrong Try again"});
                }
                else{
                  res.json({success: true, message: "Student Successfully added!"});
                }
              });
            }
          });
        }
        else{
          //sending non existance of the mail box
          res.json({success: false ,message:"Could not add student! The mailbox does not exist to send the activation email"});
        }

      });
    }
  });
});

//http://localhost:3000/api/registerAssistant ---Route to register a assistants entered by admin or assistant----
router.post('/registerAssistant', (req, res) => {
  var user = new User();
  user.username = req.body.email;

  ////password generating function
  var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //setting up user details from the request
  var password=randomString(10);
  user.password = password;
  user.email = req.body.email;
  user.user_role = req.body.userRole;

  var assistant = new Assistant;

  user.save((err) => {
    if(err){
      res.json({success: false, message: "Could not create user! The email already exits with another user"});
    }
    else{
      emailExistence.check(req.body.email , function(err,response){
        if(response){
          //sending the existance of the email
          console.log("valid email");
          var flag = false;
          var client = nodemailer.createTransport(sgTransport(options));
          var email = {
            from: 'Localhost staff,azone@localhost.com',
            to: req.body.email,
            subject: 'Account Activated',
            text: 'Hello, Your account of Azone Education Institute access has been activated. You can access the account using following username and password',
            html: 'Hello, <br><br>Your account of Azone Education Institute access has been activated.<br>You can access the online account using following username and password.<br><br>Username: '+ req.body.email+'<br>Password: '+password+'<br><br>Best Regards,<br>Azone.'
          };

          client.sendMail(email, function(err, info){
            if (err ){
              console.log(err);
              res.json({success: false ,message:"Could not create user! The Activation email couldn't sent"});
            }
            else {
              console.log('Message sent: ' + info);

              //setting up assistant details from the request
              assistant.email = req.body.email;
              assistant.first_name = req.body.firstName;
              assistant.last_name = req.body.lastName;
              var address = [req.body.address1, req.body.address2, req.body.city];
              assistant.address = address;
              assistant.mobile = req.body.mobile;
              assistant.birthday = req.body.birthday;
              assistant.gender = req.body.gender;
              assistant.nic = req.body.nic;


              assistant.save((err) => {
                if(err){
                  console.log(err);
                  res.json({success: false, message: "Could not add Assistant! Something went wrong Try again"});
                }
                else{
                  res.json({success: true, message: "Assistant Successfully added!"});
                }
              });
            }
          });
        }
        else{
          //sending non existance of the mail box
          res.json({success: false ,message:"Could not add student! The mailbox does not exist to send the activation email"});
        }

      });
    }
  });
});

//middleware to decode authentication token
router.use(function(req,res,next){
  var token = req.body.token || req.body.query || req.body.headers['x-access-token'][0];

  if(token){
    jwt.verify(token, secret, function(err, decoded){
      if(err){
        res.json({success: false, message: 'Token invalid'});
      }
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
  else{
    res.json({success: false, message: "Token not provided"});
  }
});

//http://localhost:3000/api/getUserDetails ---Route to get user details----
router.post('/getUserDetails', (req, res) => {
  res.send(req.decoded);
});



module.exports = router;





//function to send the activation email via sendgrid
function sendMail(email, password){
  var flag = false;
  var client = nodemailer.createTransport(sgTransport(options));
  var email = {
    from: 'Localhost staff,azone@localhost.com',
    to: email,
    subject: 'Account Activated',
    text: 'Hello, Your account of Azone Education Institute access has been activated. You can access the account using following username and password',
    html: 'Hello, <br><br>Your account of Azone Education Institute access has been activated.<br>You can access the online account using following username and password.<br><br>Username: '+ email+'<br>Password: '+password+'<br><br>Best Regards,<br>Azone.'
  };

  client.sendMail(email, function(err, info){
    if (err ){
      console.log(err);
      flag = false;
    }
    else {
      console.log('Message sent: ' + info);
      flag = true;
    }
  });
  return flag;
}

//function to check whether a give email is existing
function checkEmail(email){
  var flag = false;
  console.log(email);
  //check existance of the mail box for the given email address
  emailExistence.check(email, function(err,response){
    if(response){
      //sending the existance of the email
      console.log("valid email");
      flag = true;
    }
    else{
      //sending non existance of the mail box
      flag = false;
    }

  });

  return flag;

}
