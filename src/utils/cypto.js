const bcrypt = require('bcrypt')

const hashpassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

//? Returns a Boolean
const comparePassword = (plainPassword, hashpassword) => {
    return bcrypt.compareSync(plainPassword, hashpassword)
}

module.exports = {
    hashpassword,
    comparePassword
}