const mongoose = require("mongoose");

let UsersSchema = new mongoose.Schema({
  password: { type: String, required: [true, "Password can't be blank"] },
  email: {
    type: String,
    required: [true, "Email can't be blank"],
    unique: true,
    index: true,
  },
  firstName: { type: String, default: null, required: true },
  lastName: { type: String, default: null, required: true },
  creationDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("users", UsersSchema);
