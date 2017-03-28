const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = "HarryPotter";
const jwtApi = require('express-jwt');


const authCheck = jwtApi({
  secret: new Buffer('SHHH-SECRET', 'base64'),
  audience: 'audience'
});


//get api listening
router.get('/', (req, res) => {
  res.send('api works');
});


//http://localhost:3000/api/signup ---user register route----
router.post('/register', (req, res) => {
  var user = new User();
  user.username = req.body.username;
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

router.use(function(req,res,next){
  console.log(req.body.headers);
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
