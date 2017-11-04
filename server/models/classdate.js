//require statements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the Classdate schema
var ClassdateSchema = new Schema({
  class_id: {type: Schema.Types.ObjectId, required: true},
  class_date: {type: Date, required: true},
  is_extra: {type: Boolean, default: false}
});



module.exports = mongoose.model('Classdate', ClassdateSchema);
