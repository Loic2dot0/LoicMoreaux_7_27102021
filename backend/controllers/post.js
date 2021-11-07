const config = require('../config/config');
const Post = require('../models/Post');
const PostLike = require('../models/PostLike');
const PostDislike = require('../models/PostDislike');
const PostModerate = require('../models/PostModerate');
const sequelize = require('../config/sequelize');
const { QueryTypes } = require('../config/sequelize');


exports.getAllPost = (req, res, next) => { //Retourne un tableau des posts dans l'ordre décroissant des dates de publication
    sequelize.query('SELECT * FROM posts WHERE NOT id_post = (SELECT id_post FROM posts_moderate) ORDER BY createdAt DESC', { type: QueryTypes.SELECT })
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
    Post.destroy({ 
            where: {
                id_post: req.params.id_post
            }
        })
        .then(()=> res.status(200).json({message : 'Publication supprimée !'}))
        .catch((error)=> res.status(500).json({error}));
};

exports.likePost = (req, res, next) => {
    switch(req.body.like){
        case 1:
            PostLike.create({
                    id_post : req.params.id_post,
                    id_user: req.body.id_user
                })
                .then(()=> res.status(201).json({message: 'Like'}))
                .catch((error)=> res.status(500).json({error}));
            break;
        case 0:
            PostLike.findOne({
                    where: {
                        id_post: req.params.id_post,
                        id_user: req.body.id_user
                    }
                })
                .then(postlike => {
                    if(postlike != null){
                        PostLike.destroy({ 
                                where: {
                                    id_post: req.params.id_post,
                                    id_user: req.body.id_user
                                }
                            })
                            .then(config.debug && console.log('Unlike Like'))
                            .catch((error)=> res.status(500).json({error}));
                    }                     
                })
                .catch(error => res.status(500).json({error}));
                
            PostDislike.findOne({
                    where: {
                        id_post: req.params.id_post,
                        id_user: req.body.id_user
                    }
                })
                .then(postdislike => {
                    if(postdislike != null){
                        PostDislike.destroy({ 
                                where: {
                                    id_post: req.params.id_post,
                                    id_user: req.body.id_user
                                }
                            })
                            .then(config.debug && console.log('Unlike Dislike'))
                            .catch((error)=> res.status(500).json({error}));
                    }
                })
                .catch(error => res.status(500).json({error}));
                res.status(201).json({message: 'Unlike'});
            break;
        case -1:
            PostDislike.create({
                    id_post : req.params.id_post,
                    id_user: req.body.id_user
                })
                .then(()=> res.status(201).json({message: 'Dislike'}))
                .catch((error)=> res.status(500).json({error}));
            break;
    };
};

exports.moderatePost = (req, res, next) => {
    if(req.body.moderate){
        PostModerate.create({
                id_post : req.params.id_post
            })
            .then(()=> res.status(201).json({message: 'Post modéré !'}))
            .catch((error)=> res.status(500).json({error}));
    } else {
        PostModerate.destroy({ 
                where: {
                    id_post: req.params.id_post
                }
            })
            .then(()=> res.status(200).json({message : 'Modération du post supprimée !'}))
            .catch((error)=> res.status(500).json({error}));
    };
};