const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://phaneendra3377:kcF3brKwPGz3gjOW@cluster0.9dlzxla.mongodb.net/'
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fristname: String,
  lastname: String,
});

const user = mongoose.model('User', userSchema);

module.exports = { user };
