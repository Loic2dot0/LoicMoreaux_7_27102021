const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const CommentModerate = require('./CommentModerate');

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

Comment.hasOne(CommentModerate, {
    foreignKey: 'id_comment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
CommentModerate.belongsTo(Comment, { foreignKey: 'id_comment' });

module.exports = Comment;