const router = require('express').Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');

// register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'This email is not registered' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ msg: 'The password is incorrect' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
