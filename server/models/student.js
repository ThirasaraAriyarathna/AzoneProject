var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the student schema
var StudentSchema = new Schema({
  //defining fields
  user_id:{type: Schema.Types.ObjectId, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  birthday: {type: Date, required: true},
  gender: {type: String, required: true},
  address: {
    Line1: {type: String, required: true},
    Line1: {type: String, required: true},
    city: {type: String, required: true}
  },
  classes: [{
    _id: {type:Schema.Types.ObjectId, required: true},
    fees_Rate: {type: Number, required: true}
  }],
  is_delete: {type: Boolean, default: false}

});




module.exports = mongoose.model('Student', StudentSchema);
