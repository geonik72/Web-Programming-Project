const express = require('express');
const path = require('path');
const router = express.Router();

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
module.exports = router;