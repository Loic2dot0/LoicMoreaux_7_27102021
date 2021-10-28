const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const PostLike = sequelize.define('PostLike', {
    id_post:{
        type: DataTypes.STRING(36),
        allowNull: false
    },
    id_user:{
        type: DataTypes.STRING(36),
        allowNull: false
    }
}, {
    tableName: 'posts_likes',
    timestamps: false
});

module.exports = PostLike;