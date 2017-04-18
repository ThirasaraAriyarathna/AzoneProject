var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the student schema
var StudentSchema = new Schema({
  //defining fields
  //user_id:{type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  birthday: {type: Date, required: true},
  gender: {type: String, required: true},
  address: {type: Array, required: true},
  classes: {type: Array, required: true},
  is_delete: {type: Boolean, default: false}

});




module.exports = mongoose.model('Student', StudentSchema);
