const validateRoles = require('../middlewares/validar-roles');
const validateJWT = require('../middlewares/validar-jwt');
const validateCampos = require('../middlewares/validar-campos');

module.exports = {
    ...validateRoles,
    ...validateJWT,
    ...validateCampos
}