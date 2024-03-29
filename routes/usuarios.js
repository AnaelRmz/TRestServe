const { Router } = require('express');
const { check } = require('express-validator');


// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRol, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares')



const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet );


router.put('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut );


router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password  no es valido, debe de ser mas de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost );


router.patch('/', usuariosPatch );


router.delete('/:id', [
        validarJWT,
        // esAdminRol,
        tieneRole('USER_ROLE','VENTAS_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete );


  



module.exports = router