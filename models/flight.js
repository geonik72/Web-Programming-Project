const db = require('../db/database');

class Flight {
    static create(data) {
        const stmt = db.prepare(`
            INSERT INTO flights (origin_id, destination_id, "departure time", "arrival time", duration, price) 
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(data.origin_id, data.destination_id, data.departureTime, data.arrivalTime, data.duration, data.price);
        return { id: info.lastInsertRowid, ...data };
    }

    static findAll() {
        return db.prepare(`
            SELECT flights.*, 
                   origin.City as origin_city, origin.Code as origin_code, origin.Country as origin_country,
                   destination.City as destination_city, destination.Code as destination_code, destination.Country as destination_country
            FROM flights
            JOIN airports AS origin ON flights.origin_id = origin.id
            JOIN airports AS destination ON flights.destination_id = destination.id
        `).all();
    }

    static findById(id) {
        return db.prepare(`
            SELECT flights.*, 
                   origin.City as origin_city, origin.Code as origin_code, origin.Country as origin_country,
                   destination.City as destination_city, destination.Code as destination_code, destination.Country as destination_country
            FROM flights
            JOIN airports AS origin ON flights.origin_id = origin.id
            JOIN airports AS destination ON flights.destination_id = destination.id
            WHERE flights.id = ?
        `).get(id);
    }

    static findByOriginAndDestination(originCity, destinationCity) {
        return db.prepare(`
            SELECT flights.*, 
                   origin.City as origin_city, origin.Code as origin_code, origin.Country as origin_country,
                   destination.City as destination_city, destination.Code as destination_code, destination.Country as destination_country
            FROM flights
            JOIN airports AS origin ON flights.origin_id = origin.id
            JOIN airports AS destination ON flights.destination_id = destination.id
            WHERE flights.origin_id = ? AND flights.destination_id = ?
        `).all(originCity, destinationCity);
    }

    static update(id, data) {
        const stmt = db.prepare(`
            UPDATE flights SET origin_id = ?, destination_id = ?, "departure time" = ?, "arrival time" = ?, duration = ?, price = ? 
            WHERE id = ?
        `);
        stmt.run(data.origin_id, data.destination_id, data.departureTime, data.arrivalTime, data.duration, data.price, id);
        return { id, ...data };
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM flights WHERE id = ?');
        stmt.run(id);
    }
}

module.exports = Flight;
