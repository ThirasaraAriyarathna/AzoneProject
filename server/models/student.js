var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the student schema
var StudentSchema = new Schema({
  //defining fields
  user_id:{type: Schema.Types.ObjectId, required: true},
  student_id:{type: String, required: true, unique: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  birthday: {type: Date, required: true},
  gender: {type: String, required: true},
  address: {
    line1: {type: String, required: true},
    line2: {type: String, required: true},
    city: {type: String, required: true}
  },
  // classes: [{
  //   _id: {type:Schema.Types.ObjectId, required: true},
  //   fees_rate: {type: Number, required: true},
  //   is_delete: {type: Boolean, default: false}
  // }],
  is_delete: {type: Boolean, default: false}

});




module.exports = mongoose.model('Student', StudentSchema);
