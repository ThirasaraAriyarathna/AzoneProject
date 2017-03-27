const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


//get api listening
router.get('/', (req, res) => {
  res.send('api works');
});


//http://localhost:3000/api/signup
router.post('/register', (req, res) => {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "" ){
    res.json({success: false, message: "Ensure username and password and email are provided"});
  }
  else{
    user.save((err) => {
      if(err){
        res.json({success: false, message: "Username already exits"});
      }
      else{
        res.json({success: true, message: "user created"});
      }
    });
  }


});

module.exports = router;
