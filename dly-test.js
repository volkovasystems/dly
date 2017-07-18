
const assert = require( "assert" );
const dly = require( "./dly.js" );

let timestamp = Date.now( );

dly( 1000 );

timestamp = Date.now( ) - timestamp;

assert.equal( timestamp >= 1000, true, "should be true" );

timestamp = Date.now( );
dly( 1000, function done( ){
	timestamp = Date.now( ) - timestamp;

	assert.equal( timestamp >= 1000, true, "should be true" );

	console.log( "ok" );
} );
