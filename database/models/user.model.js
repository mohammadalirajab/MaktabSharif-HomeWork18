const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 8,
    validate(value) {
      if (!value.match(/(?=.*[0-9])/g))
        throw new Error(
          "The password must contain at least 1 numeric character."
        );
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
