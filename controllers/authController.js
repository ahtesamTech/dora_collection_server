// authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function login(req, res) {
  const { user, password } = req.body;
console.log(user, password);
  User.findByUsername(user, (err, user) => {
    if (err) {
        
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
    
    res.json({ token });
  });
}

module.exports = { login };
