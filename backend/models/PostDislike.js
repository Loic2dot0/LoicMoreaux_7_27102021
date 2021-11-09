const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const PostDislike = sequelize.define('PostDislike', {
    id_post:{
        type: DataTypes.UUID,
        allowNull: false
    },
    id_user:{
        type: DataTypes.STRING(36),
        allowNull: false
    }
}, {
    tableName: 'posts_dislikes',
    timestamps: false
});

module.exports = PostDislike;