const Database = require('better-sqlite3');
const db = new Database('db/SkyHop.db');

// Initialize tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS flights (
        "id"	INTEGER NOT NULL,
		"origin_id"	INTEGER NOT NULL,
		"destination_id"	INTEGER NOT NULL,
		"departure time"	TEXT NOT NULL,
		"arrival time"	NUMERIC NOT NULL,
		"duration"	TEXT NOT NULL,
		"price"	TEXT,
		"date"	TEXT,
		FOREIGN KEY("destination_id") REFERENCES "airports"("id"),
		FOREIGN KEY("origin_id") REFERENCES "airports"("id"),
		PRIMARY KEY("id")
);

	CREATE TABLE IF NOT EXISTS airports (
		"City"	TEXT NOT NULL,
		"Code"	TEXT NOT NULL,
		"Country"	TEXT NOT NULL,
		"id"	INTEGER NOT NULL,
		PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	surname TEXT, 		
	email TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS top_destinations (
	name TEXT NOT NULL,
	image BLOB NOT NULL, 		
	details TEXT NOT NULL
	
);
`);





module.exports = db;