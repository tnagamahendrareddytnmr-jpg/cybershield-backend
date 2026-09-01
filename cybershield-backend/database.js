const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.resolve(__dirname, 'cybershield.db');

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

db.serialize(() => {

  // =====================================================
  // USERS TABLE
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      name TEXT,
      email TEXT UNIQUE,
      phone TEXT UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Users table error:', err.message);
    } else {
      console.log('✅ Users table ready');
    }
  });


  // =====================================================
  // EVIDENCE VAULT TABLE
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS evidence_cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      scam_type TEXT NOT NULL,
      transaction_id TEXT,
      contact TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Evidence table error:', err.message);
    } else {
      console.log('✅ Evidence table ready');
    }
  });


  // =====================================================
  // COMMUNITY SCAM INTELLIGENCE TABLE
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS community_scams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      target_info TEXT,
      description TEXT,
      reporter TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error(
        '❌ Community scams table error:',
        err.message
      );
    } else {
      console.log('✅ Community scams table ready');
    }
  });

});

module.exports = db;