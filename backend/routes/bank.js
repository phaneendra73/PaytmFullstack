import { bank } from '../db';
import express from 'express';
import authMiddleware from './middelware';

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
  const userid = req.userid;
  const userbalance = await bank.findone({ userid: userid });

  res.statusCode(200).json({
    userbalance,
  });
});

router.post('/bank/transfer', authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  const amountfrom = await bank.findone({ userid: req.userid });
  const amountto = await bank.findone({ userid: to });

  if (amountto) {
    return res.statusCode(411).json({
      msg: 'amount to user not found',
    });
  }
  if (amount < amountfrom.amount) {
    return res.statusCode(411).json({
      msg: 'insufficenet balance',
    });
  }

  const sender = await bank.findOneAndUpdate(
    { userId: req.userId },
    { amount: amountfrom - amount },
    {
      new: true,
    }
  );
  await bank.findOneAndUpdate(
    { userId: to },
    { amount: amountfrom + amount },
    {
      new: true,
    }
  );

  res.statusCode(200).json({
    sender,
  });
});
module.exports = router;
