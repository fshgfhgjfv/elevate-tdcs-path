const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // will be hashed
  createdAt: { type: Date, default: Date.now }
});

module.exports = { UserSchema };
