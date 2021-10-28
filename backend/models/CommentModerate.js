const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const CommentModerate = sequelize.define('CommentModerate', {
    id_post:{
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'comments_moderate',
    timestamps: false
});

module.exports = CommentModerate;