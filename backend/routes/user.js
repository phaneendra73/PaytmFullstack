import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import JWT_SECRET from '../config';
import { object, string } from 'zod';
import { User } from '../db';
import { authMiddleware } from './middelware';

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

const router = Router();

router.post('/signup', async (req, res) => {
  const body = req.body;
  const { sucess } = SignupSchema.safeParse(body);
  if (!sucess) {
    return res.json({
      msg: 'invalid input values ',
    });
  }
  const existinguser = User.findone({ username: body.username });
  if (existinguser._id) {
    return res.json({
      msg: 'already a user exixts with same username ',
    });
  }
  //TODO BEFORE CREATING NEED TO HASH THE PASSWORD
  // https://mojoauth.com/blog/hashing-passwords-in-nodejs/
  const newuser = await User.create(body);
  const token = sign(
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
  const signinUser = user.findone(body);
  if (!signinUser._id) {
    return res.json({
      msg: 'invalid user credentials',
    });
  }
  const token = sign(
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
    res.status(411).json({
      message: 'Error while updating information',
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

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
