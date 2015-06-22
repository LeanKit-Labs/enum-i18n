var enumI18n = require( "../" );
var assert = require( "chai" ).assert;

const COLOR_LIST = [ "red", "yellow", "green" ];
const COLOR_OBJECT = {
	red: 1,
	yellow: 2,
	green: 3
};
const BASIC_OPTIONS = {
	name: "colors",
	translate: function( item ) {
		return item.enum.name + "." + item.key;
	}
};

describe( "EnumI18n", function() {
	it( 'factory throws error if called with a "name" option', function() {
		assert.throws( function() {
			enumI18n( { name: "not allowed" } );
		} );
	} );

	describe( "constructor with no defaults", function() {
		var EnumI18n = enumI18n();

		it( 'should throw error if missing "name" prop', function() {
			assert.throws( function() {
				new EnumI18n( COLOR_LIST, { translate: function() {} } );
			} );
		} );

		it( 'should throw error if missing "translate" prop', function() {
			assert.throws( function() {
				new EnumI18n( COLOR_LIST, { name: "colors" } );
			} );
		} );

		describe( "when instantiated", function() {
			var subject = new EnumI18n( COLOR_LIST, BASIC_OPTIONS );

			it( 'should create enum with a "name"', function() {
				assert.property( subject, "name" );
				assert.strictEqual( subject.name, BASIC_OPTIONS.name );
			} );

			it( "should have enum items", function() {
				assert.property( subject, "red" );
				assert.property( subject, "yellow" );
				assert.property( subject, "green" );
			} );

			describe( "items", function() {
				var item = subject.red;

				it( 'should have a "key" property', function() {
					assert.property( item, "key" );
					assert.strictEqual( item.key, "red" );
				} );

				it( 'should have a "value" property', function() {
					assert.property( item, "value" );
					assert.strictEqual( item.value, 1 );
				} );

				it( 'should have an "enum" property', function() {
					assert.property( item, "enum" );
					assert.strictEqual( item.enum, subject );
				} );

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
