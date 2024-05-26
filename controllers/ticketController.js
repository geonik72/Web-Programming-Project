const path = require('path');
const Flight = require('../models/flight');

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

module.exports = { renderTickets };