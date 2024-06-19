const { Bank } = require('../db');
const express = require('express');
const { authMiddleware } = require('./middelware');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
  const userid = req.userid;
  const userbalance = await Bank.findOne({ userid: userid });

  res.status(200).json({
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

  const amountfrom = await Bank.findOne({ userId: req.userId }).session(
    session
  );

  if (amountfrom.bankBalance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const amountto = await Bank.findOne({ userId: to }).session(session);
  console.log(amountto);
  if (!amountto) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  await Bank.updateOne(
    { userId: req.userId },
    { $inc: { bankBalance: -amount } }
  ).session(session);

  await Bank.updateOne(
    { userId: to },
    { $inc: { bankBalance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();

  res.status(200).json({
    msg: 'transaction successfully',
  });
});
module.exports = router;
