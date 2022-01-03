const { Router } = require('express');
const { check } = require('express-validator');

const { esAdminRole, 
        tieneRole, 
        validateJWT, 
        validarCampos} = require('../middlewares');

const { esRoleValido, esEmailExiste, esIdExiste } = require('../helpers/db-validators');
const { usersGet, 
        usersPost, 
        usersPut, 
        usersPatch, 
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe contener mas de 6 caracteres').isLength({min:6}),
        check('email', 'El correo no es valido').isEmail(),
        check('email').custom(esEmailExiste),
        //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(esRoleValido),
        validarCampos
], usersPost);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(esIdExiste),
        check('role').custom(esRoleValido),
        validarCampos
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
        validateJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(esIdExiste),
        validarCampos
], usersDelete);

module.exports = router;