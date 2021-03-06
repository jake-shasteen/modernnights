const Character = require( '../models' ).Character;

module.exports = {

  getCharacters: function( req, res ) {
    Character.findAll({ include: [{ all: true }] })
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No characters found' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

  getCharacterById: function( req, res ) {
    var id = parseInt( req.params.id );
    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'Invalid id' );
      return null;
    }
    Character.findById( id, { include: [{ all: true }] } )
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'No characters found by that ID' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

  getCharactersByPlayer: function( req, res ) {},

  makeCharacter: function( req, res ) {
    req.body.player_id = req.user.id;
    Character.create( req.body )
    .then( function( char ) {
      res.status( 201 ).json( char );
    })
  },

  editCharacter: function( req, res ) {},

  getCharacterStat: function( req, res ) {},

  editCharacterStat: function( req, res ) {},

  getCharacterSpecialties: function( req, res ) {},

  addCharacterSpecialty: function( req, res ) {},

  editCharacterSpecialty: function( req, res ) {},

  

}