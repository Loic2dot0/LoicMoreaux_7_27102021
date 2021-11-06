const config = require('../config/config');
const Post = require('../models/User');

exports.getAllPost = (req, res, next) => { //Retourne un tableau des posts dans l'ordre décroissant des dates de publication
    Post.findAll({
            order: [
                ['createAt', 'DESC']
            ]
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
            where: {
                id_post: req.params.id_post
            }
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({error}));
};

exports.createPost = (req, res, next) => {
    Post.create({
            title: req.body.title,
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            id_user: req.body.id_user
        })
        .then(()=> res.status(201).json({message: 'Publication créée !'}))
        .catch((error)=> res.status(500).json({error}));
};

exports.modifyPost = (req, res, next) => {
    Post.update({ 
                title: req.body.title
            }, {
            where: {
                id_post: req.params.id_post
            }
        })
        .then(()=> res.status(200).json({message : 'Publication modifiée !'}))
        .catch((error)=> res.status(500).json({error}));
};

exports.deletePost = (req, res, next) => {

};

exports.likePost = (req, res, next) => {

};

exports.moderatePost = (req, res, next) => {

};