const schedule = new schedule({
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
      
});

module.exports = schedule;