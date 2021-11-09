const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const Post = require('./Post');
const Comment = require('./Comment');
const Moderator = require('./Moderator');
const PostLike = require('./PostLike');
const PostDislike = require('./PostDislike');

const User = sequelize.define('User', {
    id_user:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    service:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    avatar:{
        type: DataTypes.STRING
    }
}, {

});

User.hasMany(Post, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Post.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(PostLike, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PostLike.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(PostDislike, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PostDislike.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Comment, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Moderator, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Moderator.belongsTo(User, { foreignKey: 'id_user'});

module.exports = User;