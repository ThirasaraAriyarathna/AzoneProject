var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//defining the user schema
var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:{type: String}
});

//hashing the password before saving the user into the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash){
    if(err) return next(err);
    user.password = hash;
    next();
  });
});


module.exports = mongoose.model('User', UserSchema);
