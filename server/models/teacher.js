var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//defining the Teacher schema
var TeacherSchema = new Schema({
  //defining fields
  user_id:{type: Schema.Types.ObjectId, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  mobile: {type: String, required: true},
  description: {type: String},
  email: {type: String, required: true},
  birthday: {type: Date, required: true},
  gender: {type: String, required: true},
  nic: {type:String, required:true},
  address: {
    line1: {type: String, required: true},
    line2: {type: String, required: true},
    city: {type: String, required: true}
  },
  is_delete: {type: Boolean, default: false}
});




module.exports = mongoose.model('Teacher', TeacherSchema);
