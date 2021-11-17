const express = require('express');
const sequelize = require('./config/sequelize');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


sequelize.authenticate()
    .then(() => {
        sequelize.sync()
            .then(()=>console.log('All models were synchronized successfully !'))
            .catch((error)=> console.log(error)); 
    })
    .catch((error)=> console.log(`Failed to access database : ${error}`));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorisation de toute origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorisation des entêtes listées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autorisation des méthodes listées
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports =  app;