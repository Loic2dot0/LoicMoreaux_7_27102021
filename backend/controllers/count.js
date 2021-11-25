const PostLike = require('../models/PostLike');
const PostDislike = require('../models/PostDislike');
const Comment = require('../models/Comment');

exports.countLike = (req, res, next) => {
    let like = 0;
    let userlike = false;
    
    PostLike.count({
            where: {
                id_post: req.body.id_post
            }
        })
        .then(count => {
            like = count;
            PostLike.findOne({
                    where: {
                        id_post: req.body.id_post,
                        id_user: req.body.id_user
                    }
                })
                .then(user => {
                    if(user != null){userlike = true;}
                    res.status(200).json({like, userlike});
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));    
};

exports.countDislike = (req, res, next) => {
    let dislike = 0;
    let userdislike = false;
    
    PostDislike.count({
            where: {
                id_post: req.body.id_post
            }
        })
        .then(count => {
            dislike = count;
            PostDislike.findOne({
                    where: {
                        id_post: req.body.id_post,
                        id_user: req.body.id_user
                    }
                })
                .then(user => {
                    if(user != null){userdislike = true;}
                    res.status(200).json({dislike, userdislike});
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));    
};

exports.countComment = (req, res, next) => {
    Comment.count({
            where: {
                id_post: req.body.id_post
            }
        })
        .then((comment)=> res.status(201).json({comment}))
        .catch(error => res.status(400).json({error}));    
};