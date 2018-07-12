'use strict'

class CollectionMap extends Map {
  /**
   * A map that returns new collections when getting by a non-existing key
   * and removes empty collections from itself
   * @param  {Iterable} iterable
   * @param  {[type]} valueInitCtor Initial value constructor
   * @param  {[type]} valueSizeProp Property name used to check empty values
   * @return {CollectionMap}
   */
  constructor(valueInitCtor, valueSizeProp, iterable = undefined) {
    if (typeof valueInitCtor !== 'function') {
      throw TypeError('Missing initial value constructor')
    }
    if (typeof valueSizeProp !== 'string') {
      throw TypeError('Missing value size property')
    }
    super(iterable)
    Object.assign(this, {valueInitCtor, valueSizeProp})
  }
  get(key) {
    const value = super.get(key)
    return value === undefined ? new this.valueInitCtor() : value
  }
  set(key, value) {
    if (value[this.valueSizeProp] === 0) {
      this.delete(key)
    } else {
      super.set(key, value)
    }
    return this
  }
}

class ArrayMap extends CollectionMap {
  constructor(iterable = undefined) {
    super(Array, 'length', iterable)
  }
}

class MapMap extends CollectionMap {
  constructor(iterable = undefined) {
    super(Map, 'size', iterable)
  }
}

class SetMap extends CollectionMap {
  constructor(iterable = undefined) {
    super(Set, 'size', iterable)
  }
}

module.exports = {CollectionMap, ArrayMap, MapMap, SetMap}
