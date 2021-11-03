const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const UserLog = require('../models/UserLog');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            User.create({
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                service: req.body.service })
                .then(()=> res.status(201).json({message: 'Utilisateur créé !'}))
                .catch((error)=> res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(user === null){
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){ 
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user.id_user,
                        token: jwt.sign( //fonction de Jsontoken
                            {userId: user.id_user}, // données a encoder
                            config.tokenKey , //clé d'encodage
                            {expiresIn: '24h'} // expiration du token
                        )
                    }); 
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.getUser = (req, res, next) => {

};

exports.modifyUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};