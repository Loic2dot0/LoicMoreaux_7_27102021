const multer = require('multer');
const path = require('path');

const MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']; //tableau des types mime acceptés

const fileFilter = (req, file, callback) => { //filtre pour n'accepter que les fichier dont le type mime est spécifié
    if (MIME_TYPES.includes(file.mimetype)) { 
        callback(null, true);
    } else {
        return callback(new Error('Only images are allowed'), false);
    }
}

const storagePosts = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images/posts') //indique le dossier ou enregistrer les fichiers
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random()*10000); //définition du nom de fichier unique avec un timestamp + un nbre aléatoire
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
})

const storageAvatars = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images/avatars') //indique le dossier ou enregistrer les fichiers
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random()*10000); //définition du nom de fichier unique avec un timestamp + un nbre aléatoire
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
})

exports.posts = multer({fileFilter, storage : storagePosts}).single('image');
exports.avatar = multer({fileFilter, storage : storageAvatars}).single('avatar');