const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', (req, res) => {
    const user = User.create(req.body);
    res.status(201).send(user);
});

// Get all users
router.get('/', (req, res) => {
    const users = User.findAll();
    res.send(users);
});

// Get a specific user
router.get('/:id', (req, res) => {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
});

// Update a user
router.patch('/:id', (req, res) => {
    const user = User.update(req.params.id, req.body);
    res.send(user);
});

// Delete a user
router.delete('/:id', (req, res) => {
    User.delete(req.params.id);
    res.status(204).send();
});

module.exports = router;
