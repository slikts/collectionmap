'use strict'

const test = require('tape')

const {CollectionMap, ArrayMap, SetMap, MapMap} = require('./collectionmap')

test('construct', function (t) {
  let a = new SetMap([[1, new Set([2])]])
  t.deepEquals([...a.get(1)], [2], 'init value')
  a = new SetMap()
  t.end()
})

test('get non-existing', function (t) {
  let a = new SetMap()
  t.notOk(a.has(1))
  t.deepEquals([...a.get(1)], [])
  t.end()
})

test('construct ArrayMap', function (t) {
  let a = new ArrayMap()
  t.notOk(a.has(1))
  t.ok(Array.isArray(a.get(1)))
  t.deepEquals([...a.get(1)], [])
  t.end()
})

test('should set non-empty', function (t) {
  let a = new SetMap()
  t.notOk(a.has(1))
  a.set(1, new Set([2]))
  t.ok(a.has(1))
  t.end()
})

test('should remove empty', function (t) {
  let a = new SetMap([[1, new Set([2])]])
  t.ok(a.has(1), 'init value exists')
  a.set(1, new Set())
  t.notOk(a.has(1), 'init value was removed')
  t.end()
})

test('should throw with missing values', function (t) {
  t.throws(() => new CollectionMap(), 'no params')
  t.throws(() => new CollectionMap(Set), 'missing prop name')
  t.throws(() => new CollectionMap('foo', 1), 'wrong types')
  t.doesNotThrow(() => new CollectionMap(Set, 'size'), 'correct params')
  t.end()
})
