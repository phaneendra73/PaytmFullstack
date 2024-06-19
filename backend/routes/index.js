const express = require('express');
const userRouter = require('./user');
const bankRouter = require('./bank');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    msg: 'listening at the default route',
  });
});

router.use('/user', userRouter);
router.use('/bank', bankRouter);
module.exports = router;
