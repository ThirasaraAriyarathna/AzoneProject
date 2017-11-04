//require statements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the Attendance schema
var AttendanceSchema = new Schema({
  class_id: {type: Schema.Types.ObjectId, required: true},
  class_date_id: {type: Schema.Types.ObjectId, required: true},
  student_id: {type: String, required: true},
  is_Topup: {type: Boolean, required: true}
});



module.exports = mongoose.model('Attendance', AttendanceSchema);
