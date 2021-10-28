const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const PostModerate = sequelize.define('PostModerate', {
    id_post:{
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'posts_moderate',
    timestamps: false
});

module.exports = PostModerate;