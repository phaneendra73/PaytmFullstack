const mongoose = require('mongoose');
mongoose.connect(
  mongoDB_URL
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fristname: String,
  lastname: String,
});

const user = mongoose.model('User', userSchema);

module.exports = { user };
