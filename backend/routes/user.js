const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { object, string } = require('zod');
const { Bank, User } = require('../db');
const authMiddleware = require('./middelware');

const SignupSchema = object({
  username: string().email(),
  password: string(),
  firstname: string(),
  lastname: string(),
});

const SigninSchema = object({
  username: string().email(),
  password: string(),
});

const router = express.Router();

router.post('/signup', async (req, res) => {
  const body = req.body;
  const obj = SignupSchema.safeParse(body);
  if (!obj.success) {
    return res.json({
      msg: 'invalid input values',
      obj: obj,
    });
  }
  const existinguser = User.findOne({ username: body.username });
  if (existinguser._id) {
    return res.json({
      msg: 'already a user exixts with same username ',
    });
  }
  //TODO BEFORE CREATING NEED TO HASH THE PASSWORD
  // https://mojoauth.com/blog/hashing-passwords-in-nodejs/
  const newuser = await User.create(body);
  await Bank.create({
    userId: newuser._id,
    bankBalance: (1 + Math.random()) * 1000,
  });

  const token = jwt.sign(
    {
      userid: newuser._id,
    },
    JWT_SECRET
  );
  res.json({
    msg: 'User Created Sucessfully',
    token: token,
  });
});

router.post('/signin', (req, res) => {
  const body = req.body;
  const { sucess } = SigninSchema.safeParse(body);
  if (!sucess) {
    return res.json({
      msg: 'invalid input values ',
    });
  }
  const signinUser = User.findone(body);
  if (!signinUser._id) {
    return res.json({
      msg: 'invalid user credentials',
    });
  }
  const token = jwt.sign(
    {
      userid: signinUser._id,
    },
    JWT_SECRET
  );
  res.json({
    msg: 'Signed in  Sucessfully',
    token: token,
  });
});

const updateBody = object({
  password: string().optional(),
  firstName: string().optional(),
  lastName: string().optional(),
});

router.put('/', authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: 'Error while updating information',
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: 'Updated successfully',
  });
});

router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter;
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
