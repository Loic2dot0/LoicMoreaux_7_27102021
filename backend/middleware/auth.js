const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, config.tokenKey);
        const userId = decodeToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID invalid';
        } else{
            next();
        }
    } catch (error){
        res.status(401).json({error: error | 'Requête non authentifiée'});
    }
}