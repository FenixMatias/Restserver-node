const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { permittedCollections } = require('../helpers');
const { validarCampos, validatefile } = require('../middlewares');

const router = Router();

router.post('/', validatefile, loadFile);

router.put('/:collection/:id', [
    validatefile,
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom(c => permittedCollections(c, ['users', 'products'])),
    validarCampos
], updateImageCloudinary) //updateImage)

router.get('/:collection/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom(c => permittedCollections(c, ['users', 'products'])),
], showImage);

module.exports = router;