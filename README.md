[![License][license-image]][license-url]

[![npm badge][npm-badge-png]][package-url]

# CollectionMap

A simple extension of [`Map`][map-link] that [auto-initializes][autovivify] new values with empty collections and auto-removes empty collections.

```js
const {SetMap} = require('CollectionMap')

const map = SetMap()
// Getting by a non-existent key will return an empty initial value (a set by default)
map.has('foo') // -> false
map.get('foo') // -> Set {}
// This is useful for adding to a collection without needing to initialize it
map.set('bar', map.get('bar').concat([1, 2])) // -> CollectionMap { 'foo' => Set { 1, 2 } }
// Setting an empty value will automatically remove the entry
map.set('bar', new Set()) // -> CollectionMap {}
map.has('bar') // -> false

// Versions for maps and arrays are included
const {MapMap, ArrayMap} = require('CollectionMap')

// Creating a CollectionMap for custom types is simple
class CustomSet extends Set {}
// Provide the constructor for initializing values and the property name for testing for empty values
new CollectionMap(CustomSet, 'size').get('baz') // -> CustomSet {}
// Or alternatively:
const CustomSetMap = CollectionMap.bind(CustomSet, 'size')
```

[map-link]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[license-url]: LICENSE
[license-image]: http://img.shields.io/npm/l/CollectionMap.svg
[package-url]: https://npmjs.com/package/CollectionMap
[npm-badge-png]: https://nodei.co/npm/CollectionMap.png
[autovivify]: https://en.wikipedia.org/wiki/Autovivification

## Test

```
npm install
npm test
```
