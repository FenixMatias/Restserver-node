const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const permittedCollections = [
    'users',
    'categories',
    'products',
    'rols'
];

const searchUser = async(term = '', res = response) => {

    const esMongoID = ObjectId.isValid(term); //verdadero

    if(esMongoID) {
        const user = await User.findById(term);
        res.json({
            results: (user) ? [ user ] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    });
}

const searchCategory = async(term = '', res = response) => {

    const esMongoID = ObjectId.isValid(term); //verdadero

    if(esMongoID) {
        const category = await Category.findById(term);
        res.json({
            results: (category) ? [ category ] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({name: regex, status: true})
                                        .populate('user', 'name');

    res.json({
        results: categories
    });
}

const searchProduct = async(term = '', res = response) => {

    const esMongoID = ObjectId.isValid(term); //verdadero

    if(esMongoID) {
        const product = await Product.findById(term);
        res.json({
            results: (product) ? [ product ] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({name: regex, status: true})
                                    .populate('user', 'name')
                                    .populate('category', 'name');

    res.json({
        results: products
    });
}

const search = (req, res = response) => {

    const { collection, term } = req.params;

    if (!permittedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitas son: ${permittedCollections}`
        });
        
    }

    switch (collection) {
        case 'users':
            searchUser(term, res);
        break;
        case 'categories':
            searchCategory(term, res);
        break;
        case 'products':
            searchProduct(term, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se olvio hacer esta busqueda'
            });
    }

}

module.exports = {
    search,
    searchUser,
    searchCategory,
    searchProduct
}