const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id_user:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    service:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    avatar:{
        type: DataTypes.STRING
    }
}, {

});

module.exports = User;