//require statements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the Subject schema
var SubjectSchema = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String},
  is_delete: {type: Boolean, default: false}
});



module.exports = mongoose.model('Subject', SubjectSchema);
