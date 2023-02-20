
const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')

const { getUserById } = require('../users/users.controllers')

const passportConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'academlo'
}

passport.use(new Strategy(passportConfig, (tokenDecoded, done) => {
    getUserById(tokenDecoded.id)
        .then(data => {
            if (data) {
                done(null, tokenDecoded) //? user exist and its valid

            } else {
                done(null, false) //? user doesn't exists
            }
        })
        .catch(err => {
            done(err, false) //? Database error
        })
}))


module.exports = passport