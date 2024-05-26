const path = require('path');
const Flight = require('../models/flight');
const User = require('../models/user');
const db = require('../db/database');


function renderTickets(req, res, name, surname, email, phone, idNum, ticketId, from, to, departureDate, returnDate, tripChoice){
    const isRoundTrip = tripChoice === 'round trip';

    const cityMap = {
        1: "Athens, Greece",
        2: "Porto, Portugal",
        3: "Lisbon, Portugal",
        4: "London, England",
        5: "Copenhagen, Denmark",
        6: "Stockholm, Sweden",
        7: "Berlin, Germany",
        8: "Madrid, Spain",
        9: "Barcelona, Spain",
        10: "Rome, Italy",
        11: "Milan, Italy",
        12: "Paris, France",
        13: "Budapest, Hungary",
        14: "New York, USA",
        15: "Chicago, USA",
        16: "Marrakesh, Morocco",
        17: "Cairo, Egypt",
        18: "Tokyo, Japan",
        19: "Larnaca, Cyprus",
        20: "Thessaloniki, Greece"
    };
    
    const fromCity = cityMap[from];
    const toCity = cityMap[to];
    
    res.render('myticket', {
        name,
        surname,
        email,
        phone,
        idNum,
        ticketId,
        fromCity,
        toCity,
        departureDate,
        returnDate,
        isRoundTrip
    });
}
function bookTrip(req, res, userId, flightId, date,from, to) {
    try {
        const stmt = db.prepare('INSERT INTO bookings (user_id, flight_id, date, departure, arrival) VALUES (?, ?, ?, ?, ?)');
        stmt.run(userId, flightId, date, from, to);
       
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error creating booking');
    }
}
module.exports = { renderTickets, bookTrip};