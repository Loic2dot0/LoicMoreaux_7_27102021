const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const fs = require('fs');
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
                    return res.status(401).json({error: 'Votre compte a été bloqué. Veuillez contacter un administrateur.'});
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
                        return res.status(401).json({error: 'Utilisateur ou mot de passe incorrect !'});
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
    if(req.file){ //si on reçois un fichier, on verifie l'existence d'un précédent et on le supprime
        User.findByPk(req.params.id_user) 
            .then(user => {
                if(user.avatar){
                    const filename = user.avatar.split('/images/')[1];
                    fs.unlink(`images/avatars/${filename}`, () => {console.log('Fichier image supprimé')});
                }
            })
            .catch(error => res.status(400).json({error}));
    };

    const user = req.file ? {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        service: req.body.service,
        avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
    } : {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        service: req.body.service
    };

    User.update(user,
        {
            where: {
                id_user: req.params.id_user
            }
        })
        .then(()=> res.status(200).json({message : 'Compte utilisateur modifié !'}))
        .catch((error)=> res.status(500).json({error}));
};

exports.deleteUser = (req, res, next) => {
    User.destroy({ 
            where: {
            id_user: req.params.id_user
            }
        })
        .then(()=> res.status(200).json({message : 'Compte utilisateur supprimé !'}))
        .catch((error)=> res.status(500).json({error}));
};