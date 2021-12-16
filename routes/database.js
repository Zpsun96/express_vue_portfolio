const sqlite3 = require('sqlite3').verbose()

const DB_SOURCE = 'portfolio.db'

let db = new sqlite3.Database(DB_SOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email text UNIQUE, 
            password text, 
            first_name text,
            last_name text,
            phone text,
            CONSTRAINT email_unique UNIQUE (email)
            )`);
    db.run(`CREATE TABLE message (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER
            )`);
  }
})


module.exports = db
