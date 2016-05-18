'use strict';

const jwt = require( 'jwt-simple' );

module.exports = {

  errorLogger: function ( error, req, res, next ) {
    // log the error then send it to the next middleware in
    console.error( error.stack );
    next( error );
  },
  
  errorHandler: function ( error, req, res, next ) {
    // send error message to client
    // message for graceful error handling on app
    res.status( 500 ).send({ error: error.message });
  },

  decode: function ( req, res, next ) {
    var token = req.headers['x-access-token'];
    var user;

    if ( !token ) {
      return res.send( 403 ); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode( token, 'secret' );
      req.user = user;
      next();
    } catch ( error ) {
      return next( error );
    }

  }

}
