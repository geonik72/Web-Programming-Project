const express = require('express');
const path = require('path');
const router = express.Router();
const flightController = require('../controllers/flightController');
const userController = require('../controllers/userController');
const ticketController = require('../controllers/ticketController');
const destinationController  = require('../controllers/destinationController');
const db = require('../db/database');


// User authentication routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

// Static HTML pages routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'home.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'signup.html'));
});

router.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'aboutus.html'));
});

router.get('/top-destinations', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'top-destinations.html'));
});

router.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'error.html'));
});

router.get('/booking-form', (req, res) => {
    req.session.flightId = req.query.flight_id;
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'booking-form.html'));

});

router.get('/myticket', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'myticket.hbs'));
});


router.get('/navbar', (req, res) => {
    res.render('navbar', { layout: false });
});



// Route to render destination page
router.get('/destination/:name', (req, res) => {
    const destinationName = req.params.name;
    try {
        const destination = destinationController.getDestinationByName(destinationName);
        if (destination) {
            res.render('destination', {
                name: destination.name,
                image: `data:image/jpeg;base64,${destination.image.toString('base64')}`,
                details: destination.details
            });
        } else {
            res.status(404).send('Destination not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});








// Search route for flights
router.get('/search', (req, res) => {
    const { from, to, 'departure-date': departureDate, 'return-date': returnDate, 'trip-choice': tripChoice } = req.query;
    req.session.searchParams = { from, to, departureDate, returnDate, tripChoice };

    flightController.searchFlights(req, res, from, to, departureDate, returnDate, tripChoice);
});

// Return search route for flights with swapped 'from' and 'to'
router.get('/search_results_return', (req, res) => {
    const { from, to, departureDate, returnDate, tripChoice } = req.session.searchParams;

    flightController.searchFlightsReturn(req, res, to, from, returnDate, departureDate, tripChoice);
});

// Submit booking route
router.post('/ticket', (req, res) => {
    const { name, surname, email, phone, idNum } = req.body;
    req.session.phone = phone;
    req.session.idNum = idNum;
    const ticketId = Math.floor(Math.random() * 1000000); // Generate a random ticket ID
    req.session.ticketId = ticketId;
    const { from, to, departureDate, returnDate, tripChoice } = req.session.searchParams;
    ticketController.renderTickets(req, res, name, surname, email, phone, idNum, ticketId, from, to, departureDate, returnDate, tripChoice);
    ticketController.bookTrip(req, res, req.session.user.id, req.session.flightId, departureDate, from, to);

});

router.get('/myBookings', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if user is not authenticated
    }

    const userId = req.session.user.id;

    try {
        const stmt = db.prepare(`
            SELECT 
                bookings.id AS booking_id, 
                origin.City AS origin_city,  -- Include origin city name
                destination.City AS destination_city,  -- Include destination city name
                flights."departure time" AS departure_time, 
                flights."arrival time" AS arrival_time, 
                flights.duration, 
                flights.price
            FROM bookings
            JOIN flights ON bookings.flight_id = flights.id
            JOIN airports AS origin ON flights.origin_id = origin.id  -- Join with airports table to get origin city name
            JOIN airports AS destination ON flights.destination_id = destination.id  -- Join with airports table to get destination city name
            WHERE bookings.user_id = ?
        `);

        const bookings = stmt.all(userId);
        console.log(bookings);
        res.render('booked-trips', { bookings });
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).send('Error retrieving bookings');
    }
});


module.exports = router;
