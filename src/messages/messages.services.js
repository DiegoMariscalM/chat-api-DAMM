const messageController = require('./messages.controllers')
const responses = require('../utils/handleResponses')

const getAllMessagesbyConversation = (req, res) => {
    const conversationId = req.params.conversation_id
    const userId = req.user.id

    messageController.findMessagesByconversation(conversationId, userId)
        .then(data => {
            if (data) {
                responses.success({
                    res,
                    status: 200,
                    message: 'Find all messages by conversation',
                    data
                })
            } else {
                responses.error({
                    res,
                    status: 401,
                    message: 'Youre not participant from this conversation'
                })
            }
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Error finding all messages',
                data: err
            })
        })
}

module.exports = {
    getAllMessagesbyConversation
}