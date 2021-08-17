const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')
const User = require("./models/users")

UserByEmail = (email, callback) => {
	return User.findOne({email: email}, callback);
}

function initialize (passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = UserByEmail(email)
        console.log("USER:: "+user)
        console.log(user, "Inside Passport")
        if(user == null){
            return done(null, false, { message: 'No User Found with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect' })
            }
        } catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' },
    authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize