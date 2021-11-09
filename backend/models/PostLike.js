const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const PostLike = sequelize.define('PostLike', {
    id_post:{
        type: DataTypes.UUID,
        allowNull: false
    },
    id_user:{
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'posts_likes',
    timestamps: false
});

module.exports = PostLike;