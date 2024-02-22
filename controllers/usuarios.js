const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require ('../models/usuario');



const usuariosGet = async(req = request, res = response) => {

    //const { q, nombre = "no name", apikey, page = 1, limit } = req.query;
    const { limite , desde = 0 } = req.query;
    const query = {estado: true}

    // const usuarios = await Usuario.find(query) // En lugar podria ser tambien { estado: true }
    //     .skip(Number(desde)) //toma el registro x en adelante
    //     .limit(Number(limite)); //la cantidad x sera el limite de los registros mostrados

    // const total = await Usuario.countDocuments(query); // En lugar podria ser tambien { estado: true }

    const [total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query) 
            .skip(Number(desde)) 
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
       
    });
}


const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    

    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );


    //guardar en BD



    await usuario.save();

    res.json({
        msg: 'post API - Constrolador',
        usuario
    });
  }


const usuariosPut = async(req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body

    //TODO VALIDAR CONTRA BD
    if ( password ) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);


    res.json({
        usuario
    });
  }


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Constrolador'
    })
  };


const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

  

    //eliminado fisicamente, Fernando no lo recomiendo pero funciona igual
    // const usuario = await Usuario.findByIdAndDelete( id );
    //res.json(usuario);

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false } )

    res.json(usuario);
  };  



  



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete

}