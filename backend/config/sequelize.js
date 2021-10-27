const { Sequelize, DataTypes } = require('sequelize');

const sequelizeConfig = {
    database : 'database',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
};

const sequelize = new Sequelize( sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, { 
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect 
  });

module.exports = sequelize;