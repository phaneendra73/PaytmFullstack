const { bank } = require('../db');
const express = require('express');
const authMiddleware = require('./middelware');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
  const userid = req.userid;
  const userbalance = await bank.findone({ userid: userid });

  res.statusCode(200).json({
    userbalance,
  });
});

/* router.post('/bank/transfer', authMiddleware, async (req, res) => {
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
}); */

router.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, to } = req.body;
  session.startTransaction();

  const amountfrom = await bank
    .findone({ userid: req.userid })
    .session(session);

  if (!amountfrom || amountfrom.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const amountto = await bank.findone({ userid: to }).session(session);

  if (!amountto) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  await bank
    .updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    .session(session);

  await bank
    .updateOne({ userId: to }, { $inc: { balance: amount } })
    .session(session);

  // Commit the transaction
  await session.commitTransaction();

  res.statusCode(200).json({
    msg: 'transaction sucessfull',
  });
});
module.exports = router;
