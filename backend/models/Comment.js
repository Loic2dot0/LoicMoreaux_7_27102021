const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
    id_comment:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    id_post:{
        type: DataTypes.UUID,
        allowNull: false
    },
    id_user:{
        type: DataTypes.UUID,
        allowNull: false
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {

});

module.exports = Comment;