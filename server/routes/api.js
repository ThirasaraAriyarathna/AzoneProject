const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Student = require('../models/student');
var Assistant = require('../models/assistant');
var Teacher = require('../models/teacher');
var Class = require('../models/class');
var Batch = require('../models/batch');
var Subject = require('../models/subject');
var Tstudent = require('../models/tstudent');
var Classdate = require('../models/classdate');
var Attendance = require('../models/attendance');
var jwt = require('jsonwebtoken');
var secret = "HarryPotter";
const jwtApi = require('express-jwt');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var emailExistence = require('email-existence');

//Sengrid account details
var options = {
  auth: {
    api_user: 'Ariyarathna',
    api_key: 'azone@2221421'
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
        var token = jwt.sign({username: user.username, email: user.email, role:user.user_role, id:user._id}, secret, { expiresIn: '24h' });
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
          var token = jwt.sign({username: user.username, email: user.email, role:user.user_role, id:user._id}, secret, { expiresIn: '24h' });
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

  user.save((err, suser) => {
    if(err){
      res.json({success: false, message: "Could not create user! The email already exits with another user"});
    }
    else{

      //setting up student details
      console.log(req.body);
      student.email = req.body.email;
      student.first_name = req.body.firstName;
      student.last_name = req.body.lastName;
      student.address.line1 = req.body.address1;
      student.address.line2 = req.body.address2;
      student.address.city = req.body.city;
      student.mobile = req.body.mobile;
      student.birthday = req.body.birthday;
      student.gender = req.body.gender;
      student.classes = req.body.classes;
      student.user_id = suser._id;
      User.count({user_role: "student"}, function (err, c)  {
        if (err){
          res.json({success: false, message: "Could not add student! Something went wrong Try again"});
        }
        else{
          console.log('Count is ' + c);
          var index = c+1;
          console.log(index);
          student.student_id = "STD-" + index;

          student.save((err) => {
            if(err){
              console.log(err);
              res.json({success: false, message: "Could not add student! Something went wrong Try again"});
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
                      res.json({success: true, message: "Student Successfully added! Activation email Sent"});
                    }
                  });
                }
                else{
                  //sending non existence of the mail box
                  res.json({success: false ,message:"Could not add student! The mailbox does not exist to send the activation email"});
                }
              });
            }
          });
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

  user.save((err, suser) => {
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
              assistant.address.line1 = req.body.address1;
              assistant.address.line2 = req.body.address2;
              assistant.address.city = req.body.city;
              assistant.mobile = req.body.mobile;
              assistant.birthday = req.body.birthday;
              assistant.gender = req.body.gender;
              assistant.nic = req.body.nic;
              assistant.user_id = suser._id;


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


//http://localhost:3000/api/registerTeacher ---Route to register a assistants entered by admin or assistant----
router.post('/registerTeacher', (req, res) => {
  var flag = false;
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

  var teacher = new Teacher;

  user.save((err, suser) => {
    if(err){
      res.json({success: false, message: "Could not create user! The email already exits with another user"});

    }
    else{
      console.log(suser._id);
      emailExistence.check(req.body.email , function(err,response){
        if(response){
          //sending the existance of the email
          console.log("valid email");
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
              flag = true;
              res.json({success: false ,message:"Could not create user! The Activation email couldn't sent"});
            }
            else {
              console.log('Message sent: ' + info);

              //setting up assistant details from the request
              teacher.email = req.body.email;
              teacher.first_name = req.body.firstName;
              teacher.last_name = req.body.lastName;
              teacher.address.line1 = req.body.address1;
              teacher.address.line2 = req.body.address2;
              teacher.address.city = req.body.city;
              teacher.mobile = req.body.mobile;
              teacher.birthday = req.body.birthday;
              teacher.gender = req.body.gender;
              teacher.nic = req.body.nic;
              teacher.description = req.body.description;
              teacher.user_id = suser._id;



              teacher.save((err) => {
                if(err){
                  console.log(err);
                  flag = true;
                  res.json({success: false, message: "Could not add Teacher! Something went wrong Try again"});
                }
                else{
                  res.json({success: true, message: "Teacher Successfully added!"});
                }
              });
            }
          });
        }
        else{
          //sending non existance of the mail box
          flag = true;
          console.log(err);
          res.json({success: false ,message:"Could not add Teacher! The mailbox does not exist to send the activation email"});
        }

      });
    }
  });
});

//http://localhost:3000/api/getTeachers ---Route to get teacher details in short----
router.get('/getTeachers', (req, res) => {
  Teacher.find({ is_delete: false }).select('_id first_name last_name description').exec(function(err, teachers){
    if(err){
      console.log(err);
      throw err;
    }

    if (!teachers){
      res.json({});
    }
    else if(teachers){
      console.log(teachers);
      res.json(teachers);
    }
  });
});

//http://localhost:3000/api/getBatches ---Route to get Batch details in short----
router.get('/getBatches', (req, res) => {
  Batch.find({ is_delete: false }).select('_id name').exec(function(err, batches){
    if(err){
      console.log(err);
      throw err;
    }

    if (!batches){
      res.json({});
    }
    else if(batches){
      console.log(batches);
      res.json(batches);
    }
  });
});

//http://localhost:3000/api/getSubjects ---Route to get subjects in short----
router.get('/getSubjects', (req, res) => {
  Subject.find({ is_delete: false }).select('_id name').exec(function(err, subjects){
    if(err){
      console.log(err);
      throw err;
    }

    if (!subjects){
      res.json({});
    }
    else if(subjects){
      console.log(subjects);
      res.json(subjects);
    }
  });
});

//http://localhost:3000/api/addClass ---Route to add a class to the system----
router.post('/addClass', (req, res) => {
  var classe = new Class();
  //setting up class details from the request
  classe.name = req.body.name;
  classe.teacher._id = req.body.teacherId;
  classe.teacher.name = req.body.teacherName;
  classe.teacher.description = req.body.teacherDescription;
  classe.batch._id = req.body.batchId;
  classe.batch.name = req.body.batchName;
  classe.subject._id = req.body.subjectId;
  classe.subject.name = req.body.subjectName;
  classe.start_date = req.body.startDate;
  classe.end_date = req.body.endDate;
  classe.start_time = req.body.startTime;
  classe.end_time = req.body.endTime;
  classe.fees = req.body.fees;

  classe.save((err) => {
    if(err){
      console.log(err);
      res.json({success: false, message: "Something went wrong! Please try again"});
    }
    else{
      res.json({success: true, message: "Class successfully added!"});
    }
  });

});

//http://localhost:3000/api/searchStudentId ---Route to search student id for attendance marking----
router.post('/searchStudentId', (req, res) => {

  console.log(req.body);
  Tstudent.findOne({ student_id: req.body.id }).exec(function(err, student){
    if(err){
      console.log(err);
      throw err;
    }

    if (!student){
      res.json({});
    }
    else if(student){
      var flag =  false;
      var activeClasses = getActiveClasses();
      var activeClassesFull = getActiveClassesFull();
      var activeRegisteredClasses = [];
      var classDetails = [];
      if (activeClasses){
        for (var i =0; i <student.classes.length; i++){
          if(activeClasses.contains(student.classes[i]._id)){
            flag = true;
            activeRegisteredClasses.push(student.classes[i]);
          }
        }
        if (flag){
          for (var i = 0; i<activeRegisteredClasses.length; i++){
            for (var j=0; j<activeClassesFull.length; i++){
              if(activeRegisteredClasses[i] == activeClassesFull[j]._id){
                classDetails.push(activeClassesFull[j]);
              }
            }
          }
          res.json({student: student, classes: activeRegisteredClasses, classesFull:classDetails});
        }
        else{
          res.json({});
        }
      }
      else{
        res.json({});
      }


      // console.log(student);
      // res.json(student);
    }
  });
});


//http://localhost:3000/api/getClasses ---Route to get classes of the system----
router.get('/getClasses', (req, res) => {
  Class.find({ is_delete: false, status: true}).exec(function(err, classes){
    if(err){
      console.log(err);
      throw err;
    }

    if (!classes){
      res.json({});
    }
    else if(classes){
      console.log(classes);
      res.json(classes);
    }
  });
});


//http://localhost:3000/api/getClassesByCategory ---Route to get classes of given category----
router.post('/getClassesByCategory', (req, res) => {

  console.log(req.body);
  if (req.body.category == "Name"){
    var criteria = "name";
  }
  else if (req.body.category == "Subject"){
    var criteria = "subject.name";
  }
  else if (req.body.category == "Batch"){
    var criteria = "batch.name";
  }
  else{
    var criteria = "teacher.name";
  }
  // else (req.body.category == "Day"){
  //   criteria = "name";
  // }

  Class.find({ name : req.body.text }).exec(function(err, classes){
    if(err){
      console.log(err);
      throw err;
    }

    if (!classes){
      res.json({});
    }
    else if(classes){
      console.log(classes);
      res.json(classes);
    }
  });
});


//http://localhost:3000/api/getClass ---Route to get class details----
router.post('/getClass', (req, res) => {

  console.log(req.body);
  Class.findOne({ _id: req.body.id }).exec(function(err, classe){
    if(err){
      console.log(err);
      throw err;
    }

    if (!classe){
      res.json({});
    }
    else if(classe){
      console.log(classe);
      res.json(classe);
    }
  });
});


//http://localhost:3000/api/activateClass ---Route to activate a class----
router.post('/activateClass', (req, res) => {

  console.log(req.body);
  Class.update({ _id: req.body.id }, { $set: { is_active: true }}).exec(function(err){
    if(err){
      console.log(err);
      res.json({success: false, message: "Could not activate the class! Please try again"});
      throw err;
    }
    else{
      classDate = new Classdate();
      classDate.class_id = req.body.id;
      classDate.class_date = req.body.date;
      classDate.save((err) => {
        if(err){
          console.log(err);
          res.json({success: false, message: "Something went wrong! Please try again"});
        }
        else{
          res.json({success: true, message: "Class successfully Activated!"});
        }
      });
    }
  });
});

//http://localhost:3000/api/setUpExtraClass ---Route to set up an extra class----
router.post('/setUpExtraClass', (req, res) => {

  console.log(req.body);
  Class.update({ _id: req.body.id }, { $set: { is_active: true }}).exec(function(err){
    if(err){
      console.log(err);
      res.json({success: false, message: "Could not activate the class! Please try again"});
      throw err;
    }
    else{
      classDate = new Classdate();
      classDate.class_id = req.body.id;
      classDate.class_date = req.body.date;
      classDate.is_extra = true;
      classDate.save((err) => {
        if(err){
          console.log(err);
          res.json({success: false, message: "Could setup an Extra class! Something went wrong! Please try again"});
        }
        else{
          res.json({success: true, message: "Set up Extra class successfully"});
        }
      });
    }
  });
});

//http://localhost:3000/api/deactivateClass ---Route to deactivate a class----
router.post('/deactivateClass', (req, res) => {

  console.log(req.body);
  Class.update({ _id: req.body.id }, { $set: { is_active: false }}).exec(function(err){
    if(err){
      console.log(err);
      res.json({success: false, message: "Could not deactivate the class! Please try again"});
      throw err;
    }
    else{
      res.json({success: true, message: "Class successfully Deactivated!"});
    }
  });
});

//http://localhost:3000/api/deleteClass ---Route to delete a class----
router.post('/deleteClass', (req, res) => {

  console.log(req.body);
  Class.update({ _id: req.body.id }, { $set: { is_delete: true }}).exec(function(err){
    if(err){
      console.log(err);
      res.json({success: false, message: "Could not delete the class! Please try again"});
      throw err;
    }
    else{
      res.json({success: true, message: "Class successfully Deleted!"});
    }
  });
});

//http://localhost:3000/api/registerClass ---Route to register a online student to a class----
router.post('/registerClass', (req, res) => {

  console.log(req.body);

  Tstudent.findOne({ user_id: req.body.userId }).exec(function(err, student){
    if(err){
      console.log(err);
      throw err;
    }

    if (!student){
      var tstudent = new Tstudent();
      //setting up user details from the request
      tstudent.user_id = req.body.userId;
      tstudent.classes.push({_id: req.body.classId, fees_rate: 1})
      User.count({user_role: "student"}, function (err, c)  {
        if (err){
          res.json({success: false, message: "Could not Register to the class! Something went wrong Try again"});
        }
        else {
          console.log('Count is ' + c);
          var index = c + 1;
          console.log(index);
          tstudent.student_id = "STD-" + index;
          tstudent.save((err) => {
            if (err){
              console.log(err);
              res.json({success: false, message: "Could not Register to the class! Something went wrong Try again"});
            }
            else{
              res.json({success: true, message: "You have successfully registered to the class!"});
            }
          });
        }
      });
    }
    else if(student){
      var flag =  false;
      for (var i =0; i <student.classes.length; i++){
        if(student.classes[i]._id == req.body.classId){
          flag = true;
          break;
        }
      }
      if(flag){
        res.json({success: true, message: "You have already registered for this course"});
      }
      else{
        Tstudent.update({ user_id: req.body.userId }, { $push: { classes: {_id: req.body.classId, fees_rate: 1}}}).exec(function(err) {
          if (err){
            console.log(err);
            res.json({success: false, message: "Could not Register to the class! Something went wrong Try again"});
            throw err;

          }
          else{
            res.json({success: true, message: "You have successfully registered to the class!"});
          }
        });
        // Tstudent.update({user_id: req.body.userId}, {'$set': {
        //   'classes.$.': 'updated item2',
        //   'items.$.value': 'two updated'
        // }}, function(err) {

        }
      console.log(student);
      // res.json(student);
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

function getActiveClasses(){

  Class.find({ is_active: true }).select('_id').exec(function(err, classe){
    if(err){
      console.log(err);
      throw err;
      return false;
    }

    if (!classe){
      return false;
    }
    else if(classe){
      console.log(classe);
      return classe;
    }
  });
}

function getActiveClassesFull(){

  Class.find({ is_active: true }).exec(function(err, classe){
    if(err){
      console.log(err);
      throw err;
      return false;
    }

    if (!classe){
      return false;
    }
    else if(classe){
      console.log(classe);
      return classe;
    }
  });
}
