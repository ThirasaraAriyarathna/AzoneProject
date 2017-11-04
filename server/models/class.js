var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining the student schema
var ClassSchema = new Schema({
  //defining fields
  name: {type: String, required: true},
  subject: {
    _id: {type:Schema.Types.ObjectId, required: true},
    name: {type:String, required: true}
  },
  batch: {
    _id: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true}
  },
  teacher: {
    _id: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    description: {type: String}
  },
  fees: {type: Number, required: true},
  start_date: {type: Date, required: true},
  start_time: {type: String, required: true},
  end_time: {type: String, required: true},
  end_date:{type: Date, require: true},
  days: [{
    day: {type: String},
    startTime: {type: String},
    endTime: {type: String}
  }],
  status: {type: Boolean, default: true},
  is_active: {type: Boolean, default: false},
  is_delete: {type: Boolean, default: false}

});




module.exports = mongoose.model('Class', ClassSchema);
