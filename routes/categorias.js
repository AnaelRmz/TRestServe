const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');


const router = Router();

// {{url}}/api/categorias




//Obtener todas las categorias | Publico
router.get('/', obtenerCategorias );


//Obtener una categoria por id | publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),//pide id de mongo valido
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria );


//Crear categoria categoria | privado | cualquier persona con token valido
router.post('/',[ 
     validarJWT,
      check('nombre', 'El nombre es obligacion').not().isEmpty(),
      validarCampos
 ], crearCategoria 
);


//Actualizar por id | privado | cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligacion').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);


// Borrar categoria | admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);






module.exports = router;
