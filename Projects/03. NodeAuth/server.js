const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const User = require("./models/users")

mongoose.connect("mongodb+srv://test:test@cluster0.on8xo.mongodb.net/nodeAuth")


const initializePassport = require("./passport-config")
initializePassport(
    passport,
    email => User.findOne({email: email}, (err, res) => res),
    id => User.findById(id)
)

const app = express()

const users = []

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", checkAuthenticated, (req, res) => {
    res.render("index", { name: req.user.name })
})

app.get("/login", checkNotAuthenticated,  (req, res) => {
    res.render("login")
})

app.post("/login", checkNotAuthenticated,  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
})

app.post("/register", checkNotAuthenticated, async (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let pass = req.body.password

    const hashedPassword = await bcrypt.hash(pass, 10)
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: name,
        email: email,
        password: hashedPassword
    })

    user.save()
    .then(result => {
        console.log(result)
        // res.json(result)
        res.redirect("/login")
    })
    .catch(result => {
        console.log(result)
        // res.json({ status: 500, msg: "User not Created"})
        res.redirect("/redirect")
    })


})

app.delete("/logout", (req, res) => {
    req.logOut()
    res.redirect("/login")
})


function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }

    next()
}

app.post("/test", (req, res) => {
    res.json(req.body);
})


app.listen(3000, () => console.log("Listening at http://localhost:3000"))