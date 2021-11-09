const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const CommentModerate = sequelize.define('CommentModerate', {
    id_comment:{
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'comments_moderate',
    timestamps: false
});

module.exports = CommentModerate;