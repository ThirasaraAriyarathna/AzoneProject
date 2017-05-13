//require statements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the Assistant schema
var AssistantSchema = new Schema({
  user_id:{type: Schema.Types.ObjectId, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  mobile: {type: String, required: true},
  email: {type: String, required: true},
  birthday: {type: Date, required: true},
  gender: {type: String, required: true},
  nic: {type:String, required:true},
  address: {
    Line1: {type: String, required: true},
    Line1: {type: String, required: true},
    city: {type: String, required: true}
  },
});




module.exports = mongoose.model('Assistant', AssistantSchema);
