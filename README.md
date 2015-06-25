# Introduction

`enum-i18n` extends the excellent enum implementation [adrai/enum](https://github.com/adrai/enum). It exposes an Enum constructor that can be configured with a `translate` function.


## Installation

```bash
npm install -S enum-props
```


## Usage

This document addresses the i18n features added here. For full documentation see [adrai/enum](https://github.com/adrai/enum).


### Constructor Factory

The default export of this module is a factory that returns partially configured `Enum` constructors. You can pass any config values supported by [adrai/enum](https://github.com/adrai/enum#usage) and they will be used for any enumerations instantiated with the returned constructor.

```js
var enumI18n = require('enum-i18n');
var FrozenEnum = enumI18n({ freez: true }); // Constructor for readonly enums
var InsensitiveEnum = enumI18n({ ignoreCase: true }); // Constructor for case insensitive enums
```


### Translate Functions

Every enumeration must be provided a translate function. This function will be called to get a plain-text description of each enum member. A translate function will be passed an enum member and is expected to return a string.

You can pass a translate function to the constructor factory:
```js
var Enum = require('enum-i18n')({
    translate: function(member) {
        return getTranslation('enums.' + member.enum.name + '.' + member.key);
    }
});

// Same as this shorthand:
var Enum = require('enum-i18n')(function(member) {
    return getTranslation('enums.' + member.enum.name + '.' + member.key);
});
```

Or you can pass a translate function to the constructor:
```js
var Enum = require('enum-i18n')();
var colors = new Enum(['red', 'yellow', 'green'], {
    name: 'colors',
    translate: function(member) {
        return member.key;
    }
});
```

If you pass both then the constructor's translate function will win.


### Enum Construction

Every enumeration must be provided with a `name` and a `translate` function. The `name` must be provided at the time the enumeration is instantiated.

```js
var Enum = require('enum-i18n')(translator);
var colors = Enum(['red', 'yellow', 'green'], {
    name: 'colors'
});

// Same as shorthand:
var colors = Enum(['red', 'yellow', 'green'], 'colors');
```

You can also pass any options supported by [adrai/enum](https://github.com/adrai/enum#usage).


## Example (shared translation set)

If you have a single translation collection for your app, you can pass a translate function in the `enum-i18n` options:

```js
// Pass config and get back an Enum constructor
var Enum = require('enum-i18n')(function(member) {
    // Return a string to use as the enum member's description
    return getTranslation('enums.' + member.enum.name + '.' + member.key);
);

// Define a simple enum
var colors = new Enum([ 'red', 'yellow', 'green' ], 'colors');

// Render the member keys/values/descriptions
colors.enums.map(function(member) {
    return member.key + ', ' + member.value + ', ' + member.toDescription();
});
/*
[
    "red, 1, enums.colors.red",
    "yellow, 2, enums.colors.yellow",
    "green, 4, enums.colors.green"
]
*/
```


## Example (independent translation sets)

If you have a translation collection per enumeration, you can pass a translate function in the constructor options:

```js
// Pass config and get back an Enum constructor
var Enum = require('enum-i18n')();

var COLOR_NAMES: {
    red: 'stop',
    yellow: 'caution',
    green: 'go'
};

// Define a simple enum
var colors = new Enum([ 'red', 'yellow', 'green' ], { 
    name: 'colors',
    translate: function(member) {
        // Return a string to use as the enum member's description
        return COLOR_NAMES[member.key];
    }
});

// Render the member keys/values/descriptions
colors.enums.map(function(member) {
    return member.key + ', ' + member.value + ', ' + member.toDescription();
});
/*
[
    "red, 1, stop",
    "yellow, 2, caution",
    "green, 4, go"
]
*/
```
