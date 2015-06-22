var Enum = require( "enum" );
var clone = require( "deap/shallow" ).clone;

module.exports = function( defaults ) {
	defaults = defaults || {};

	class EnumI18n extends Enum {
		constructor( map, options ) {
			var opts = clone( options, defaults );

			if ( !( opts && opts.name && ( typeof opts.translate === "function" ) ) ) {
				throw new Error( "EnumI18n requires 'name' and 'translate' options." );
			}

			// We need to update enum members after creation so if they want
			// them frozen we will call freezeEnums ourselves after changes.
			var freezeEnums = opts.freez;
			opts.freez = false;

			super( map, opts );

			function getTranslation() {
				return opts.translate( this );
			}

			// Extend enum members with a link to their parent and a method for
			// getting a text translation
			var members = this.enums,
				i = members.length;
			while ( i-- ) {
				members[i].enum = this;
				members[i].description = getTranslation;
			}

			// Follow through on that promise to freeze the enum
			if ( freezeEnums ) {
				this.freezeEnums();
			}
		}
	}

	return EnumI18n;
};
