var pkg = require( "./package.json" );
var gulp = require( "gulp" );
var webpack = require( "gulp-webpack" );
var uglify = require( "gulp-uglify" );
var rename = require( "gulp-rename" );
var header = require( "gulp-header" );

var banner = [ "/**",
	" * <%= pkg.name %> - <%= pkg.description %>",
	" * Author: <%= pkg.author %>",
	" * Version: v<%= pkg.version %>",
	" * Url: <%= pkg.homepage %>",
	" * License: <%= pkg.license %> Copyright (c) <%= ( new Date() ).getFullYear() %> LeanKit",
	" */",
"" ].join( "\n" );

require( "biggulp/common-gulp" )( gulp, { esnext: true } );

// gulp.task( "build:es6", [ "format" ], function() {
gulp.task( "build:es6", [ "format" ], function() {
	return gulp.src( "src/enum-i18n.js" )
		.pipe( header( banner, {
			pkg: pkg
		} ) )
		.pipe( rename( "enum-i18n.es6.js" ) )
		.pipe( gulp.dest( "lib/" ) );
} );

gulp.task( "build:es5", [ "format" ], function() {
	return gulp.src( "src/enum-i18n.js" )
		.pipe( webpack( {
			output: {
				libraryTarget: "umd"
			},
			module: {
				loaders: [
					{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
				]
			}
		} ) )
		.pipe( header( banner, {
			pkg: pkg
		} ) )
		.pipe( rename( "enum-i18n.js" ) )
		.pipe( gulp.dest( "lib/" ) )
		.pipe( uglify() )
		.pipe( header( banner, {
			pkg: pkg
		} ) )
		.pipe( rename( "enum-i18n.min.js" ) )
		.pipe( gulp.dest( "lib/" ) );
} );

gulp.task( "default", [ "build:es6", "build:es5" ] );
