const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const bcrypt = require('bcrypt');
const { object, string } = require('zod');
const { Bank, User } = require('../db');
const { authMiddleware } = require('./middelware');

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

const processZodError = (error) => {
  const issues = error.errors || error.issues;
  return issues
    .map((issue) => `Field ${issue.path.join('.')} is ${issue.message}`)
    .join(', ');
};

const router = express.Router();

router.post('/signup', async (req, res) => {
  const body = req.body;
  const obj = SignupSchema.safeParse(body);

  if (!obj.success) {
    const errorMessage = processZodError(obj.error);
    return res.status(400).json({
      msg: errorMessage,
    });
  }

  try {
    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
      return res.status(409).json({
        msg: 'User already exists with the same username',
      });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(body.password, 10); // Hash with salt rounds

    const newUser = await User.create({
      username: body.username,
      password: hashedPassword,
      firstname: body.firstname,
      lastname: body.lastname,
    });

    // Create associated bank account for the new user
    await Bank.create({
      userId: newUser._id,
      bankBalance: (1 + Math.random()) * 1000, // Example random balance
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userid: newUser._id,
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      msg: 'User Created Successfully',
      token: token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      msg: 'Failed to create user. Please try again later.',
    });
  }
});
router.post('/signin', async (req, res) => {
  const body = req.body;
  const obj = SigninSchema.safeParse(body);

  if (!obj.success) {
    return res.status(402).json({
      msg: 'Invalid input values',
      errors: obj.error,
    });
  }

  try {
    const { username, password } = body;

    const signinUser = await User.findOne({ username });

    if (!signinUser) {
      return res.status(402).json({
        msg: 'Invalid user credentials',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, signinUser.password);

    if (!isPasswordValid) {
      return res.status(402).json({
        msg: 'Invalid user credentials',
      });
    }

    const token = jwt.sign(
      {
        userid: signinUser._id,
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      msg: 'Signed in successfully',
      token: token,
    });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({
      msg: 'Failed to sign in. Please try again later.',
    });
  }
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
  const filter = req.query.filter || '';

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
