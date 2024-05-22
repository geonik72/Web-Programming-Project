const express = require('express');
const path = require('path');
const router = express.Router();
const Flight = require('../models/flight');

// Define your routes here


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'home.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'signup.html'));
    
  });

router.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'aboutus.html'));
    
  });

  router.get('/search', (req, res) => {
    const { from, to, 'departure-date': departureDate, 'return-date': returnDate, 'trip-choice': tripChoice } = req.query;
    console.log(from, to, departureDate, returnDate, tripChoice);   
    try {
        const results = Flight.findByOriginAndDestination(from, to);
        if (results.length === 0) {
            return res.status(404).send({ error: 'No flights found' });
        }
        res.send(results);
    } catch (error) {
        console.error('Error searching for flights:', error);
        res.status(500).send({ error: 'An error occurred while searching for flights' });
    }
});

module.exports = router;