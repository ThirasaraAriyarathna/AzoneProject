//require statements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the Assistant schema
var AssistantSchema = new Schema({
  //user_id:{type: Objectid, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  mobile: {type: String, required: true},
  email: {type: String, required: true},
  birthday: {type: Date, required: true},
  gender: {type: String, required: true},
  nic: {type:String, required:true},
  address: {type: Array, required: true},
});




module.exports = mongoose.model('Assistant', AssistantSchema);
