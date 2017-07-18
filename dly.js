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
			"called": "called",
			"child": "child_process",
			"falzy": "falzy",
			"truly": "truly",
			"zelf": "zelf"
		}
	@end-include
*/

const called = require( "called" );
const child = require( "child_process" );
const falzy = require( "falzy" );
const truly = require( "truly" );
const zelf = require( "zelf" );

const dly = function dly( pause, later ){
	/*;
		@meta-configuration:
			{
				"pause:required": "number",
				"later": "function"
			}
		@end-meta-configuration
	*/

	if( falzy( pause ) || typeof pause != "number" ){
		throw new Error( "invalid pause value" );
	}

	if( truly( later ) && typeof later != "function" ){
		throw new Error( "invalid later method" );
	}

	if( truly( later ) ){
		later = called.bind( zelf( this ) )( later );

		child.exec(
			`${ process.execPath } -e "setTimeout( ( ) => true, ${ pause } );"`,
			{ "detached": true },
			( ) => { try{ later( ); }catch( error ){ } }
		);

	}else{
		child.execSync(
			`${ process.execPath } -e "setTimeout( ( ) => true, ${ pause } );"`,
			{ "detached": true }
		);

		return true;
	}
};

module.exports = dly;
