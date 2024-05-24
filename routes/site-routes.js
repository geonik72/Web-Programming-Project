const express = require('express');
const path = require('path');
const router = express.Router();
const Flight = require('../models/flight');

// Define your routes here



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

  router.get('/search_results_return', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'search_results_return.html'));
  });



  router.get('/search', (req, res) => {
    const { from, to, 'departure-date': departureDate, 'return-date': returnDate, 'trip-choice': tripChoice } = req.query;
    console.log(from, to, departureDate, returnDate, tripChoice);   
    
    const isRoundTrip = tripChoice === 'round trip';
    const isOneWay = tripChoice === 'one way';
    
    
    try {
        const results = Flight.findByOriginAndDestination(from, to);
        if (results.length === 0) {
            res.sendFile(path.join(__dirname, '..', 'public', 'views', 'error.html'));
        }


        const processedResults = results.map(flight => {
          return {
            ...flight,
            departure_time: flight['departure time'],
            arrival_time: flight['arrival time'],
            duration: flight['duration'],
            price: flight['price'],
            origin_city: flight['origin_city'],
            origin_code: flight['origin_code'],
            origin_country: flight['origin_country'],
            destination_city: flight['destination_city'],
            destination_code: flight['destination_code'],
            destination_country: flight['destination_country']
          };
        });
    

        //res.send(processedResults);
        console.log(results)
        results.forEach(flight => {
          console.log(flight['departure time'])
        })
        res.render('search-results', { 
          flights: processedResults, isRoundTrip, isOneWay,
          departureDate: departureDate,
          returnDate: returnDate
        });
        
        console.log(departureDate, returnDate)

        
        } 
       



        catch (error) {
        console.error('Error searching for flights:', error);
        res.status(500).send({ error: 'An error occurred while searching for flights' });
    }
});

module.exports = router;