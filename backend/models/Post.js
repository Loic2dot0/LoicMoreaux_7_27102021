const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const Comment = require('./Comment');

const Post = sequelize.define('Post', {
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

Post.hasMany(Comment, {
    foreignKey: 'id_post',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(Post, { foreignKey: 'id_post' });

module.exports = Post;