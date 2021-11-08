const config = require('../config/config');
const sequelize = require('../config/sequelize');
const { QueryTypes } = require('../config/sequelize');

exports.getAllComment = (req, res, next) => {
    sequelize.query('SELECT * FROM comments WHERE id_post = :id_post AND  NOT id_comment = (SELECT id_comment FROM comments_moderate) ORDER BY createdAt ASC',
        { 
            replacements: { id_post : req.params.id_post },
            type: QueryTypes.SELECT })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}));
};

exports.createComment = (req, res, next) => {

};

exports.modifyComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};

exports.moderateComment = (req, res, next) => {

};