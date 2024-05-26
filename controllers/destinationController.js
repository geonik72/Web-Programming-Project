const db = require('../db/database');


function getDestinationByName(name) {
    const stmt = db.prepare('SELECT name, image, details FROM top_destinations WHERE name = ?');
    return stmt.get(name);
}

module.exports = { getDestinationByName };