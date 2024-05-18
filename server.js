//Importing librareis that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") //Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")




initializePassport(
    passport,
    email => users.find(user => user.email === email))


const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    webprogrammingproject: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.post("/signup", async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(users);
        res.redirect("/login")
    }catch (e){
        console.log(e);
        res.redirect("/signup")

    }
})



// ROUTES
app.get("/", (req,res) => {
    res.render("home.ejs")
})


app.get('/signup', (req,res) =>{
    res.render("signup.ejs")
})

app.get('/login', (req,res) =>{
    res.render("login.ejs")
})






app.listen(3000)