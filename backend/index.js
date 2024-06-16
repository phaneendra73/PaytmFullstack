const express = require('express');
const mainRouter = require('./routes/index');
const app = express();
const port = 3000;

app.use('api/v1', mainRouter);

app.get('api/v1', (req, res) => {
  res.json({
    msg: 'listening at the default route',
  });
});

app.listen((port) => {
  console.log(`app is listening at ${port}`);
});
