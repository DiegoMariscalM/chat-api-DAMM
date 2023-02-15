// Import Sequelize constructor from the library
const Sequelize = require("sequelize");

// Import database connection from config.js
const sequelize = require("../config/config.js");

// Initialize Message model (table) by passing the connection instance
const Message = sequelize.define("message", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
});

// Export the model
module.exports = Message;