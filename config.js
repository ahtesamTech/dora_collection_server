const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'doracoll_dora_db',
//     password: 'S9NQbz92h6ece75',
//     database: 'doracoll_dora_collection'
// });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dora_collection'  
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;



// Create a connection to the MySQL databas