const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');


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

};

exports.getUser = (req, res, next) => {

};

exports.modifyUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};