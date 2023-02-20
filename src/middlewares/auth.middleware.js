//? import passport complete core
const passport = require('passport')

//? import from passport-jwt 
const { ExtractJwt, Strategy } = require('passport-jwt')

//? import controller that allows validate if users exists in my db
const { getUserById } = require('../users/users.controllers')

const passportConfig = {
    //? This config extract Bearer token from my petition
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'academlo'
}

passport.use(new Strategy(passportConfig, (tokenDecoded, done) => {
    getUserById(tokenDecoded.id)
        .then(data => {
            if (data) {
                done(null, tokenDecoded) //? user exist and its valid

            } else {
                done(null, false, { message: 'Token incorrect' }) //? user doesn't exists
            }
        })
        .catch(err => {
            done(err, false) //? Database error
        })
}))


module.exports = passport