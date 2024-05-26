// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, surname, email, password } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, surname, email, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error during signup');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }
        // Save user information in the session
        req.session.user = user;
        res.redirect('/');
        console.log(user)
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
};



const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};



module.exports = {
    signup,
    login,
    logout
};