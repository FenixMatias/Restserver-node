const dbValidators = require('./db-validators');
const generateJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generateJwt,
    ...googleVerify,
    ...uploadFile
}