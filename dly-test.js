
const assert = require( "assert" );
const dly = require( "./dly.js" );

let timestamp = Date.now( );

assert.equal( dly( 1000, true ), true, "should be true" );

timestamp = Date.now( ) - timestamp;

assert.equal( timestamp >= 1000, true, "should be true" );

console.log( "ok", timestamp );

timestamp = Date.now( );
dly( 1000 )( function done( error, result ){
	timestamp = Date.now( ) - timestamp;

	assert.equal( result, true, "should be true" );

	assert.equal( timestamp >= 1000, true, "should be true" );

	console.log( "ok", timestamp );
} );

assert.equal( dly( { "command": "echo -n false;" }, true ), false, "should be false" );

console.log( "ok" );

dly( { "command": "echo -n false;" } )( function done( error, result ){
	assert.equal( result, false, "should be false" );

	console.log( "ok" );
} );
