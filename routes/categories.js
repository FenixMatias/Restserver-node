const { Router } = require('express');
const { check } = require('express-validator');

const { categoryPost,
        categoryGet,
        categoryGetId, 
        categoryPut,
        categoryDelete} = require('../controllers/categories');

const { existsCategory } = require('../helpers/db-validators');

const { validarCampos, 
    validateJWT, 
    esAdminRole} = require('../middlewares');

const router = Router();

//listar categorias - publico
router.get('/', categoryGet);

//listar categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsCategory),
    validarCampos,
], categoryGetId);

//crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoryPost);

//actualizar categoria por id - privado - cualquier persona con token valido
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existsCategory),
    validarCampos
],categoryPut);

//eliminar categoria por id - privado - solo admin
router.delete('/:id', [
    validateJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsCategory),
    validarCampos
], categoryDelete);

module.exports = router;