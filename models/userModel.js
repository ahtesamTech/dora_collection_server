// userModel.js
const connection = require('../config');


class User {
  static findByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results[0]);
    });
  }
}

module.exports = User;
