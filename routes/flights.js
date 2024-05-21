const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// Create a new flight
router.post('/', (req, res) => {
    const flight = Flight.create(req.body);
    res.status(201).send(flight);
});

// Get all flights
router.get('/', (req, res) => {
    const flights = Flight.findAll();
    res.send(flights);
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


// Get a specific flight
router.get('/:id', (req, res) => {
    console.log('1234');
    const flight = Flight.findById(req.params.id);
    if (!flight) return res.status(404).send();
    res.send(flight);
});

// Get flights by origin and destination



// Update a flight
router.patch('/:id', (req, res) => {
    const flight = Flight.update(req.params.id, req.body);
    res.send(flight);
});

// Delete a flight
router.delete('/:id', (req, res) => {
    Flight.delete(req.params.id);
    res.status(204).send();
});

module.exports = router;
