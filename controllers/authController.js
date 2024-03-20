// authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function login(req, res) {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, 'secret_key');
    res.json({ token });
  });
}

module.exports = { login };
