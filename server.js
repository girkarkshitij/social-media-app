const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log('Server started');
});
