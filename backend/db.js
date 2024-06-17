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

const bankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  bankBalance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
const Bank = mongoose.model('Bank', bankSchema);

module.exports = { User, Bank };
