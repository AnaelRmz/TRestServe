const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '' ) => { //uid: identificador unico del usuario
    
    return new Promise( (resolve, reject ) => {
        //En el payload podemos guardar cualquier cosa pero la info sera vulnerable por lo que fernando recomidno solo usar uid
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if( err ) {
                console.log(err);
                reject('No se pudo genera el token')
            } else {
                resolve( token );
            }
        })
    })


}


module.exports = {
    generarJWT
}