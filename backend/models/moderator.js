const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Moderator = sequelize.define('Moderator', {
    id_user:{
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Moderator;