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

// Get a specific flight
router.get('/:id', (req, res) => {
    const flight = Flight.findById(req.params.id);
    if (!flight) return res.status(404).send();
    res.send(flight);
});

// Get flights by origin and destination
router.get('/search', (req, res) => {
    const { origin_id, destination_id } = req.query;
    const flights = Flight.findByOriginAndDestination(origin_id, destination_id);
    if (!flights.length) return res.status(404).send();
    res.send(flights);
});

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
