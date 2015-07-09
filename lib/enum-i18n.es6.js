/**
 * enum-i18n - Enum with support for translated member descriptions
 * Author: Matt Dunlap<matt.dunlap@leankit.com>
 * Version: v0.1.1
 * Url: https://github.com/LeanKit-Labs/enum-i18n
 * License: MIT Copyright (c) 2015 LeanKit
 */
"use strict";

var Enum = require( "enum" );
var clone = require( "deap/shallow" ).clone;

module.exports = function( defaults ) {
	if ( typeof defaults === "function" ) {
		defaults = { translate: defaults };
	} else {
		defaults = defaults || {};
	}

	if ( defaults.name ) {
		throw new Error( "'name' cannot be provided as a default option to enum-i18n." );
	}

	class EnumI18n extends Enum {
		constructor( map, options ) {
			if ( typeof options === "string" ) {
				options = { name: options };
			}

			var opts = clone( defaults, options );

			if ( !( opts.name && typeof opts.name === "string" ) ) {
				throw new Error( "EnumI18n requires a 'name' string." );
			}

			if ( typeof opts.translate !== "function" ) {
				throw new Error( "EnumI18n requires a 'translate' function." );
			}

			// We need to update enum members after creation so if they want
			// them frozen we will call freezeEnums ourselves after changes.
			var freezeEnums = opts.freez;
			opts.freez = false;

			super( map, opts );

			function getTranslation() {
				// This function is used as a method and `this` is valid here
				// jshint validthis:true
				return opts.translate( this );
			}

			// Extend enum members with a link to their parent and a method for
			// getting a text translation
			var members = this.enums;
			var i = members.length;
			while ( i-- ) {
				Object.defineProperty( members[i], "enum", { value: this, enumerable: false } );
				Object.defineProperty( members[i], "toDescription", { value: getTranslation, enumerable: false } );
			}

			// Follow through on that promise to freeze the enum
			if ( freezeEnums ) {
				this.freezeEnums();
			}
		}
	}

	return EnumI18n;
};
