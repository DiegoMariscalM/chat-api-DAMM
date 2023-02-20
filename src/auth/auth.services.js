
const checkUserCredentials = require('./auth.controller')
const response = require('../utils/handleResponses')
const jwt = require('jsonwebtoken')

const postLogin = (req, res) => {
    const { email, password } = req.body
    checkUserCredentials(email, password)
        .then(data => {
            if (data) {

                const token = jwt.sign({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName
                }, 'academlo', {
                    expiresIn: '30 days'
                })

                response.success({
                    res,
                    status: 200,
                    messge: 'Correct credentials',
                    data: token
                })
            } else {
                response.error({
                    res,
                    status: 401,
                    message: 'Invalid cerednetials'
                })
            }
        })
        .catch(err => {
            response.error({
                res,
                status: 400,
                data: err,
                message: 'Something went wrong'
            })
        })
}

module.exports = postLogin