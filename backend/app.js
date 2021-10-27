const express = require('express');
const sequelize = require('./config/sequelize');


sequelize.authenticate()
    .then(() => console.log('Successfull to access database'))
    .catch((error)=> console.log(`Failed to access database : ${error}`));

const app = express();

module.exports =  app;