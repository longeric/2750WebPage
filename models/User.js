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
  schedule: new mongoose.Schema({
    Id: Number,
    Subject: {type: String},
    Location: {type: String},
    StartTime: {type: String},
    EndTime: {type: String},
    RecurrenceRule: {type: String},
    CategoryColor: {type: String},
    IsAllDay: Boolean,
    StartTimezone: String,
    EndTimezone: String,
    PriorityId: Number,
    RecurrenceException: String,
    RecurrenceID: String
  }),
  unschedule: { type: Array }
});

module.exports = User = mongoose.model("user", UserSchema);



// [{
//     subject: {type: String},
//     "location": {type: String},
//     "categoryColor": {type: String}
//   }]
