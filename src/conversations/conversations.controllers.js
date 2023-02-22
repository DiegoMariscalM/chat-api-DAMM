
const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')
const uuid = require('uuid')

const findAllConversationsByUser = async (userId) => {
    const dara = await Conversations.findAll({
        include: {
            model: Participants,
            where: {
                userId: userId
            }
        }
    })
    return data
}

const createConversations = async (conversationObj, userOwnerId, userGuestId) => {


    // Validates if the user exists
    const userGuest = Users.findOne({ where: { id: userGuestId } })

    if (!userGuest) {
        return false
    }

    const newConversation = await Conversations.create({
        id: uuid.v4(),
        name: conversationObj.name,
        profileImage: conversationObj.profileImage,
        isGropu: conversationObj.isGropu
    })

    // Owner
    await Participants.create({
        id: uuid.v4(),
        userId: userOwnerId,
        conversationId: newConversation.id,
        isAdmin: true
    })

    await Participants.create({
        id: uuid.v4(),
        userId: userGuestId,
        conversationId: newConversation.id,
        isAdmin: false
    })
    return newConversation
}

module.exports = {
    createConversations,
    findAllConversationsByUser
}