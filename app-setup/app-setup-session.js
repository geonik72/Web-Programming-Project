const session =require('express-session')
const dotenv = require('dotenv');

dotenv.config();

const { SESSION_SECRET, SESSION_NAME, SESSION_LIFETIME } = process.env;

let siteSession = session({
    secret: "mysecretkey",
    name: "skyhop_session",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:7200000, sameSite: true}
});

module.exports =  siteSession;
    