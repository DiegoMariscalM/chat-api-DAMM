

const { compare } = require('bcrypt')
const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/cypto')


const checkUserCredentials = async (email) => {
    try {
        const user = await findUserByEmail(email, password)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}