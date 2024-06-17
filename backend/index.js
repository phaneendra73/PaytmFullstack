const express = require('express');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mainRouter = require('./routes/index');
const app = express();
const port = 3000;

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
  return res.send('<h1>HELLO WORLD</h1>');
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
