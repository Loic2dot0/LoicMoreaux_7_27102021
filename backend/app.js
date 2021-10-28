const express = require('express');
const sequelize = require('./config/sequelize');
const User = require('./models/User');
const UserLog = require('./models/UserLog');
const Moderator = require('./models/Moderator');
const Post = require('./models/Post');
const PostModerate = require('./models/PostModerate');
const PostLike = require('./models/PostLike');
const PostDislike = require('./models/PostDislike');


sequelize.authenticate()
    .then(() => {
        User.sync()
            .then(()=>console.log('User table synchronized!'))
            .catch((error)=> console.log(error));
        UserLog.sync()
            .then(()=>console.log('UserLog table synchronized!'))
            .catch((error)=> console.log(error));
        Moderator.sync()
            .then(()=>console.log('Moderator table synchronized!'))
            .catch((error)=> console.log(error));
        Post.sync()
            .then(()=>console.log('Post table synchronized!'))
            .catch((error)=> console.log(error));
        PostModerate.sync()
            .then(()=>console.log('Posts_moderate table synchronized!'))
            .catch((error)=> console.log(error));
        PostLike.sync()
            .then(()=>console.log('Posts_likes table synchronized!'))
            .catch((error)=> console.log(error));
        PostDislike.sync()
            .then(()=>console.log('Posts_dislikes table synchronized!'))
            .catch((error)=> console.log(error));        
        console.log('Successfull to access database');
    })
    .catch((error)=> console.log(`Failed to access database : ${error}`));

const app = express();

module.exports =  app;