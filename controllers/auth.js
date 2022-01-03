/*const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-JWT');
const User = require('../models/user');


const login = async(req, res = response) => {

    const { email, password} = req.body;

    try {

        //verificar si el correo existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'El usuario o contraseña no son correctos - correo'
            });
        }

        //verificar si el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'El usuario no existe - estado inactivo'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El usuario o contraseña no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador'
        });
    }

}

module.exports = {
    login
}*/