const { response, request } = require('express');
const { Product } = require('../models');

//obtener productos - paginado - total - populate
const productGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
};

//obtener producto por id - populate
const productGetId = async(req = request, res = response) => {

    const { id } = req.params;
    const product = await Product.findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name');
    

    res.json(product);
};


//crear producto
const productPost = async(req, res = response) => {

    const {user, status, ...body} = req.body;
    const productdb = await Product.findOne({name: body.name});

    if (productdb) {
        return res.status(400).json({
            msg: `El producto ${Product.name}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);

    //guardar en db
    await product.save();
    
    res.status(201).json(product);
};

//actualizar producto
const productPut = async(req, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(product);
}

//borrar producto
const productDelete = async(req, res = response) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(product);
};


module.exports = {
    productPost,
    productGet,
    productGetId,
    productPut,
    productDelete
}