const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  firstName: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  lastName: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  role: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    requied: true,
    default: new Date(),
  },
  resetPasswordToken: {
    type: mongoose.SchemaTypes.String,
    default: undefined,
  },
  resetPasswordExpires: {
    type: mongoose.SchemaTypes.String,
    default: undefined,
  },
});

module.exports = mongoose.model("users", UserSchema);
