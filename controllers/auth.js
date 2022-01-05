const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req, res = response) => {
    
    const {id_token} = req.body;

    try {
        
        const {name, img, email} = await googleVerify(id_token);

        let user = await User.findOne({email});

        if (!user) {
            //crear usuario
            const data = {
                name,
                email,
                password: ':(',
                role: 'USER_ROLE',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
            
        }

        //si el usuario esta en db
        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //generar el jwt
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se puedo verificar'
        });
    }

}

module.exports = {
    login,
    googleSignIn
}