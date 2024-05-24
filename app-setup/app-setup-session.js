const session =require('express-session')
const dotenv = require('dotenv');

dotenv.config();

const { SESSION_SECRET, SESSION_NAME, SESSION_LIFETIME } = process.env;

let siteSession = session({
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:Number(SESSION_LIFETIME), sameSite: true}
});

module.exports =  siteSession;
    