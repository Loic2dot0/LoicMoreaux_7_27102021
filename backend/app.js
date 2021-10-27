const express = require('express');
const sequelize = require('./config/sequelize');
const User = require('./models/User');
const UserLog = require('./models/UserLog');


sequelize.authenticate()
    .then(() => {
        User.sync()
            .then(()=>console.log('User table created !'))
            .catch((error)=> console.log(error));
        UserLog.sync()
            .then(()=>console.log('UserLog table created !'))
            .catch((error)=> console.log(error));    
        console.log('Successfull to access database');
    })
    .catch((error)=> console.log(`Failed to access database : ${error}`));

const app = express();

module.exports =  app;