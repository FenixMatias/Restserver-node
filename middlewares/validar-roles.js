const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se requiere verificar el rol sin validar el token primero'
        });
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador - no tiene este privilegio`
        });
    }
    next();
}

const tieneRole = (...rols) => {

    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se requiere verificar el rol sin validar el token primero'
            });
        }

        if (!rols.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${rols}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}