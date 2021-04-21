const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  },
  schedule: [{
      Id: mongoose.Schema.Types.ObjectId,
      Subject: {type: String},
      Location: {type: String},
      StartTime: {type: String},
      EndTime: {type: String},
      RecurrenceRule: {type: String},
      CategoryColor: {type: String}
    }],
  unschedule: { type: Array }
});

module.exports = User = mongoose.model("user", UserSchema);



// [{
//     subject: {type: String},
//     "location": {type: String},
//     "categoryColor": {type: String}
//   }]
