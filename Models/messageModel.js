const mongoose = require("mongoose");

let MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  subject: String,
  creationDate: { type: Date, default: Date.now() },
  isSeen: { type: Boolean, default: false }, //True - if the message have been read by the User,False - not read yet
});

module.exports = mongoose.model("Messages", MessageSchema);
