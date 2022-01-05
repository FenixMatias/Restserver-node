const { response, request } = require('express');
const { Category } = require('../models');

//obtener categorias - paginado - total - populate
const categoryGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
};

//obtener categoria por id - populate
const categoryGetId = async(req = request, res = response) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    

    res.json(category);
};


//crear categoria
const categoryPost = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categorydb = await Category.findOne({name});

    if (categorydb) {
        return res.status(400).json({
            msg: `La categoria ${categorydb.name}, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    //guardar en db
    await category.save();
    
    res.status(201).json(category);
};

//actualizar categoria
const categoryPut = async(req, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);
}

//borrar categoria
const categoryDelete = async(req, res = response) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(category);
};


module.exports = {
    categoryPost,
    categoryGet,
    categoryGetId,
    categoryPut,
    categoryDelete
}