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
    defaulst: false
  },
  schedule: {type: Array},
  unschedule: {type: Array}
});

module.exports = User = mongoose.model("user", UserSchema);

// [{
//       _id: mongoose.Schema.Types.ObjectId,
//       subject: {type: String},
//       "location": {type: String},
//       "startTime": {type: String},
//       "endTime": {type: String},
//       "recurrenceRule": {type: String},
//       "categoryColor": {type: String}
//     }]

// [{
//     subject: {type: String},
//     "location": {type: String},
//     "categoryColor": {type: String}
//   }]