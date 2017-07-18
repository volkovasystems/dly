/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "dly",
			"path": "dly/dly.js",
			"file": "dly.js",
			"module": "dly",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/dly.git",
			"test": "dly-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Pause node.
	@end-module-documentation

	@include:
		{
			"child": "child_process",
			"depher": "depher",
			"detr": "detr",
			"letgo": "letgo",
			"raze": "raze",
			"zelf": "zelf"
		}
	@end-include
*/

const child = require( "child_process" );
const depher = require( "depher" );
const detr = require( "detr" );
const letgo = require( "letgo" );
const raze = require( "raze" );
const zelf = require( "zelf" );

const DEFAULT_PAUSE = 1000;

const dly = function dly( pause, synchronous, option ){
	/*;
		@meta-configuration:
			{
				"pause": "number",
				"synchronous": boolean,
				"option": "object"
			}
		@end-meta-configuration
	*/

	let parameter = raze( arguments );

	pause = depher( parameter, NUMBER, DEFAULT_PAUSE );

	synchronous = depher( parameter, BOOLEAN, false );

	option = detr( parameter, {
		"command": `${ process.execPath } --eval "setTimeout( ( ) => true, ${ pause } );"`
	} );

	let command = option.command;

	if( synchronous ){
		try{
			child.execSync( command, { "stdio": "ignore" } );

			return true;

		}catch( error ){
			return false;
		}

	}else{
		return letgo.bind( zelf( this ) )( function later( callback ){
			child.exec( command, { "detached": true, "stdio": "ignore" }, function done( error ){
				if( error instanceof Error ){
					callback( new Error( `cannot delay properly, ${ error.stack }` ), false );

				}else{
					callback( null, true );
				}
			} );
		} );
	}
};

module.exports = dly;
