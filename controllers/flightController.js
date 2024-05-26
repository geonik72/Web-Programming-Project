// controllers/flightController.js
const path = require('path');
const Flight = require('../models/flight');

// Helper function to handle search logic
const searchFlights = async (req, res, from, to, departureDate, returnDate, tripChoice) => {
    const isRoundTrip = tripChoice === 'round trip';
    const isOneWay = tripChoice === 'one way';

    try {
        const results = await Flight.findByOriginAndDestination(from, to);
        
        if (results.length === 0) {
            return res.status(404).sendFile(path.join(__dirname, '..', 'public', 'views', 'error.html'));
        }
        console.log(results);
        const processedResults = results.map(flight => ({
            ...flight,
            id : flight.id,
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
        }));

        res.render('search-results', { 
            flights: processedResults,
            isRoundTrip,
            isOneWay,
            departureDate,
            returnDate
        });

      

    } catch (error) {
        console.error('Error searching for flights:', error);
        res.status(500).send({ error: 'An error occurred while searching for flights' });
    }
};



const searchFlightsReturn = async (req, res, from, to, departureDate, returnDate, tripChoice) => {
  
    try {
        const results = await Flight.findByOriginAndDestination(from, to);
        
        if (results.length === 0) {
            return res.status(404).sendFile(path.join(__dirname, '..', 'public', 'views', 'error.html'));
        }
  
        const processedResults2 = results.map(flight => ({
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
        }));
  
        res.render('search_results_return', { 
            flights: processedResults2,
            departureDate,
            returnDate
        });
  
    } catch (error) {
        console.error('Error searching for flights:', error);
        res.status(500).send({ error: 'An error occurred while searching for flights' });
    }
  };




module.exports = {
    searchFlights,
    searchFlightsReturn
};
