var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//defining the user schema
var TstudentSchema = new Schema({
  //defining fields
  user_id: {type: Schema.Types.ObjectId, required: true, unique: true},
  student_id: {type: String, required: true, unique: true},
  classes: [{
    _id: {type:Schema.Types.ObjectId, required: true},
    fees_rate: {type: Number, required: true},
    is_delete: {type: Boolean, default: false}
  }],
});

module.exports = mongoose.model('Tstudent', TstudentSchema);
