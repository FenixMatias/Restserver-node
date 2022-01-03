const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find({query}).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

const usersPost = async(req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //Encriptar contaseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await user.save();
    
    res.json(user);
};

const usersPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, email, ...resto} = req.body;

    //Validar con la base de datos
    if (password) {
        //Encriptar contaseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
};

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    /*Borrado fisicamente(no se recomienda)
    const user = await User.findByIdAndDelete(id);*/

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({user});
};



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}