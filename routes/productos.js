const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { creaProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto,
        crearProducto} = require('../controllers/productos')

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { crearCategoria } = require('../controllers/categorias');




const router = Router();

// {{url}}/api/categorias




//Obtener todas las categorias | Publico
router.get('/', obtenerProductos );


//Obtener una categoria por id | publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),//pide id de mongo valido
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto );


//Crear categoria categoria | privado | cualquier persona con token valido
router.post('/',[ 
     validarJWT,
      check('nombre', 'El nombre es obligacion').not().isEmpty(),
      check('categoria', 'No es un id de Mongo').isMongoId(),
      check('categoria').custom(existeCategoriaPorId),
      validarCampos
 ], crearProducto
);


//Actualizar por id | privado | cualquiera con token valido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto);


// Borrar categoria | admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto);






module.exports = router;
