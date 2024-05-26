const express = require('express');
const path = require('path');
const router = express.Router();
const flightController = require('../controllers/flightController');
const userController = require('../controllers/userController');
const ticektController = require('../controllers/ticketController');
const { getDestinationByName } = require('../db/database');


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
        const destination = getDestinationByName(destinationName);
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
router.post('/submitBooking', (req, res) => {
    const { name, surname, email, phone, idNum } = req.body;
    const ticketId = Math.floor(Math.random() * 1000000); // Generate a random ticket ID
    const { from, to, departureDate, returnDate, tripChoice } = req.session.searchParams;
    ticektController.renderTickets(req, res, name, surname, email, phone, idNum, ticketId, from, to, departureDate, returnDate, tripChoice);
    //res.render('myticket', { name, surname, email, phone, idNum, ticketId, from, to, departureDate, returnDate});
});

module.exports = router;
