// authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret_key = 'bb06f4abc0cbf930660696ae7b9582ccba58975e843d1a064ebd8585d0c730026803ad79dd03f7d11bbc355dc57470f00a1c4ab892ed6ac4075c5c26d33af4a1';

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
    const token = jwt.sign({ id: user.id, username: user.username }, secret_key, { expiresIn: '1h' });
    
    res.json({ token });
  });
}

module.exports = { login };
