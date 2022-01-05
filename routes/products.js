const { Router } = require('express');
const { check } = require('express-validator');

const { productGet, 
        productPost, 
        productGetId, 
        productPut, 
        productDelete } = require('../controllers/products');

const { existsProduct, existsCategory } = require('../helpers/db-validators');

const { validarCampos, 
    validateJWT, 
    esAdminRole} = require('../middlewares');

const router = Router();

//listar producto - publico
router.get('/', productGet);

//listar producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos,
], productGetId);

//crear producto - privado - cualquier persona con token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un ID válido').isMongoId(),
    check('category').custom(existsCategory),
    validarCampos
], productPost);

//actualizar producto por id - privado - cualquier persona con token valido
router.put('/:id', [
    validateJWT,
    check('category', 'No es un ID válido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
],productPut);

//eliminar producto por id - privado - solo admin
router.delete('/:id', [
    validateJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
], productDelete);

module.exports = router;