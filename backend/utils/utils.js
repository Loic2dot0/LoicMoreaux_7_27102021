const crypto = require('crypto');

exports.hashmail = (email) =>{
  const key = crypto.createHash('sha256').update("62*_Yevx_k5F(PH94uP/").digest('base64').substr(0, 32);
  const mailencrypt = crypto.createHash('sha256').update(email).digest('base64').substr(0, 32);
  const addkey = mailencrypt + key;
  const reversing = addkey.split('').reverse().join('');
  return crypto.createHash('sha256').update(reversing).digest('base64').substr(0, 32);
};