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
    UserLog.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(userlog =>{
            let trycount = 0;
            if(userlog != null){
                if(userlog.try >= 3){
                    config.debug && console.log('Votre compte a été bloqué. Veuillez contacter un administrateur.');
                    return res.status(401).json({message: 'Votre compte a été bloqué. Veuillez contacter un administrateur.'});
                }
                else{
                    trycount = userlog.try;
                }
            }

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
                                if(trycount == 0){
                                    UserLog.create({ email: req.body.email})
                                        .then(()=>config.debug && console.log('creation dans userlog'))
                                        .catch((error)=> console.log(error));
                                        trycount++;
                                } else {
                                    trycount++;
                                    UserLog.update({ try: trycount }, {
                                            where: {
                                                email: req.body.email
                                            }
                                        })
                                        .then(()=> config.debug && console.log('Modification dans userlog'))
                                        .catch((error)=> console.log(error));
                                }
                                let message = trycount >= 3 ? `Votre compte a été bloqué. Veuillez contacter un administrateur.` : `Mot de passe incorrect ! Il vous reste ${ 3 - trycount} tentative(s)`; 
                                return res.status(401).json({error: message});
                            }
                            if(trycount != 0){
                                UserLog.destroy({ 
                                        where: {
                                        email: req.body.email
                                        }
                                    })
                                    .then(()=> config.debug && console.log('suppresion de userlog'))
                                    .catch((error)=> console.log(error));
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
        })
        .catch(error => res.status(500).json({error}));
};

exports.getUser = (req, res, next) => {
    User.findOne({
        attributes: { 
            exclude: ['email', 'password']
        },
        where: {
            id_user: req.params.id_user
        }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}));
};

exports.modifyUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};