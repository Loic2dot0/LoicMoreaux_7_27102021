const express = require('express');
const sequelize = require('./config/sequelize');
const User = require('./models/User');
const UserLog = require('./models/UserLog');
const Moderator = require('./models/moderator');


sequelize.authenticate()
    .then(() => {
        User.sync()
            .then(()=>console.log('User table created or updated !'))
            .catch((error)=> console.log(error));
        UserLog.sync()
            .then(()=>console.log('UserLog table created or updated!'))
            .catch((error)=> console.log(error));
        Moderator.sync()
            .then(()=>console.log('Moderator table created or updated!'))
            .catch((error)=> console.log(error));     
        console.log('Successfull to access database');
    })
    .catch((error)=> console.log(`Failed to access database : ${error}`));

const app = express();

module.exports =  app;