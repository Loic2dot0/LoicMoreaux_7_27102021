const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const UserLog = sequelize.define('UserLog', {
    email:{
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    try: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'users_log',
    timestamps: false
});

module.exports = UserLog;