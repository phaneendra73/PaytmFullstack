require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
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
