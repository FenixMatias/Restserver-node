const Rol = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(role = '') => {
    const existRol = await Rol.findOne({ role });
    if( !existRol ) {
       throw new Error(`El rol ${ role } no esta definido en la BD`)
    }
}

const esEmailExiste = async(email = '') => {
    //Verificar si el correo existe
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`El email ${ email }, ya esta registrado`)
    }
}

const esIdExiste = async(id = '') => {
    //Verificar si el id existe
    const existID = await User.findById(id);
    if (!existID) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

module.exports = {
    esRoleValido,
    esEmailExiste,
    esIdExiste
}