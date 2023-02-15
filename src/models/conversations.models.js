
const DataTypes = require("sequelize");
const db = require("../database");

const Conversation = db.define("conversation", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    profileImage: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isGroup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Conversation;