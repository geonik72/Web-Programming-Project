const express = require('express');
const bodyParser = require('body-parser');
const flightRoutes = require('./routes/flights');
const userRoutes = require('./routes/users');
const siteRoutes = require('./routes/site-routes'); // Corrected path
const path = require('path');

const app = express();






// Middleware
app.use(bodyParser.json());



app.use(express.urlencoded({ extended: false }));



// Serve static files from the "public" directory
app.use(express.static('public'));

// Routes
app.use('/', siteRoutes);

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);







// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));