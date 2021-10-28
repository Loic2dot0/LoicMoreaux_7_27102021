const express = require('express');
const sequelize = require('./config/sequelize');
const Models = require('./models/ExportModels');


sequelize.authenticate()
    .then(() => {
        Models.User.sync()
            .then(()=>console.log('Users table synchronized!'))
            .catch((error)=> console.log(error));
        Models.UserLog.sync()
            .then(()=>console.log('Users_Log table synchronized!'))
            .catch((error)=> console.log(error));
        Models.Moderator.sync()
            .then(()=>console.log('Moderators table synchronized!'))
            .catch((error)=> console.log(error));
        Models.Post.sync()
            .then(()=>console.log('Posts table synchronized!'))
            .catch((error)=> console.log(error));
        Models.PostModerate.sync()
            .then(()=>console.log('Posts_moderate table synchronized!'))
            .catch((error)=> console.log(error));
        Models.PostLike.sync()
            .then(()=>console.log('Posts_likes table synchronized!'))
            .catch((error)=> console.log(error));
        Models.PostDislike.sync()
            .then(()=>console.log('Posts_dislikes table synchronized!'))
            .catch((error)=> console.log(error));
        Models.Comment.sync()
            .then(()=>console.log('Comments table synchronized!'))
            .catch((error)=> console.log(error));
        Models.CommentModerate.sync()
            .then(()=>console.log('Comments_moderate table synchronized!'))
            .catch((error)=> console.log(error));        
        console.log('Successfull to access database');
    })
    .catch((error)=> console.log(`Failed to access database : ${error}`));

const app = express();

module.exports =  app;