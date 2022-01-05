const { User, Category, Role, Product} = require('../models');

const esRoleValido = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if( !existRole ) {
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

const existsCategory = async( id ) => {
    //Verificar si existe la categoria por id
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

const existsProduct = async( id ) => {
    //Verificar si existe el producto por id
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`El ID ${ id }, no existe`)
    }
}

module.exports = {
    esRoleValido,
    esEmailExiste,
    esIdExiste,
    existsCategory,
    existsProduct
}