const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: String,
  email: String
});

const AuthorInfo = mongoose.model("AuthorInfo", authorSchema);

module.exports = AuthorInfo;
