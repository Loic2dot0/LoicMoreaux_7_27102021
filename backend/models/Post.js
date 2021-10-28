const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Post = sequelize.define('User', {
    id_post:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_user:{
        type: DataTypes.UUID,
        allowNull: false
    }
}, {

});

module.exports = Post;