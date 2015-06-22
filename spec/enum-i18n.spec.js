var enumI18n = require( "../" );
var assert = require( "chai" ).assert;
var colorList = [ "red", "yellow", "green" ];
var basicOptions = {
	name: "colors",
	translate: function( item ) {
		return item.enum.name + "." + item.key;
	}
};

describe( "EnumI18n", function() {
	describe( "constructor with no defaults", function() {
		var EnumI18n = enumI18n();

		it( 'should throw error if missing "name" prop', function() {
			assert.throws( function() {
				new EnumI18n( colorList, { translate: function() {} } );
			} );
		} );

		it( 'should throw error if missing "translate" prop', function() {
			assert.throws( function() {
				new EnumI18n( colorList, { name: "colors" } );
			} );
		} );

		describe( "when instantiated", function() {
			var subject = new EnumI18n( colorList, basicOptions );

			it( 'should create enum with a "name"', function() {
				assert.property( subject, "name" );
				assert.strictEqual( subject.name, basicOptions.name );
			} );

			it( "should have enum items", function() {
				assert.property( subject, "red" );
				assert.property( subject, "yellow" );
				assert.property( subject, "green" );
			} );

			describe( "items", function() {
				var item = subject.red;

				it( 'should have a "description" method', function() {
					assert.property( item, "description" );
					assert.isFunction( item.description );
				} );

				it( '"description" method should return translation', function() {
					assert.strictEqual( item.description(), "colors.red" );
				} );
			} );
		} );
	} );

	describe( 'constructor with default "translate" function', function() {} );

	describe( 'constructor with default "freez" function', function() {} );
} );
