const Database = require('better-sqlite3');
const db = new Database('flightDB.db', { verbose: console.log });

// Initialize tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS flights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        flightNumber TEXT,
        departure TEXT,
        destination TEXT,
        departureTime TEXT,
        arrivalTime TEXT,
        price REAL
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
    );
`);

module.exports = db;