const validaCAmpos     = require('../middlewares/validar-campos')
const validaJWT        = require('../middlewares/validar-jwt');
const validaRoles      = require('../middlewares/validar-roles');
const validarArchivo   = require('../middlewares/validar-archivo');


module.exports = {
    ...validaCAmpos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo
}

//los tres puntitos es para importar todo el contenido dentro del archivo/
