const validateRoles = require('../middlewares/validar-roles');
const validateJWT = require('../middlewares/validar-jwt');
const validateCampos = require('../middlewares/validar-campos');
const validateFile = require('../middlewares/validate-file')

module.exports = {
    ...validateRoles,
    ...validateJWT,
    ...validateCampos,
    ...validateFile
}