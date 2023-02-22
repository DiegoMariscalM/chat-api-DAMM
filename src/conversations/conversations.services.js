
const conversationControllers = require('./conversations.controllers')
const responses = require('../utils/handleResponses')
const { response } = require('express')


const getAllConversationsByUser = (req, res) => {
    const userId = req.user.id

    conversationControllers.findAllConversationsByUser(userId)
        .then(data => {
            responses.success({
                res,
                status: 200,
                message: data.length ? 'Showing all youre conversations' : 'No conversations to show',
                data
            })
        })
        .catch(err => {
            responses.eror({
                res,
                status: 400,
                message: 'Something went wrong',
                data: err
            })
        })
}

const postNewConversation = (req, res) => {

    const ownerId = req.user.id
    const { guestId, ...conversationObj } = req.body


    conversationControllers.createConversations(conversationObj, ownerId, guestId)
        .then(data => {
            if (data) {
                response.success({
                    res,
                    status: 201,
                    message: 'conversation created successfully',
                    data
                })
            } else {
                responses.error({
                    res,
                    status: 400,
                    message: `User with id: ${guestId} not found`,
                })
            }
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: err.message || 'something went wrong',
                data: err,
                fields: {
                    name: 'String',
                    profileImage: 'String',
                    isGropu: 'boolean',
                    guestId: 'String UUID'
                }
            })
        })

}