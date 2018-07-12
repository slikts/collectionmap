interface Newable<A> {
  new (...args: any[]): A
}

export class CollectionMap<A, B> extends Map<A, B> {
  /**
   * A map that returns new collections when getting by a non-existing key
   * and removes empty collections from itself
   */
  constructor(
    readonly valueInitCtor: Newable<B>,
    readonly valueSizeProp: keyof B,
    iterable: Iterable<[A, B]> = []
  ) {
    super(iterable)
    if (typeof valueInitCtor !== 'function') {
      throw TypeError('Missing initial value constructor')
    }
    if (typeof valueSizeProp !== 'string') {
      throw TypeError('Missing value size property')
    }
    this.valueInitCtor = valueInitCtor
    this.valueSizeProp = valueSizeProp
  }

  get(key: A): B | undefined {
    const value = super.get(key)
    return value === undefined ? new this.valueInitCtor() : value
  }

  set(key: A, value: B): this {
    if (<any>value[this.valueSizeProp] === 0) {
      this.delete(key)
    } else {
      super.set(key, value)
    }
    return this
  }
}

export class ArrayMap<A, B> extends CollectionMap<A, B[]> {
  constructor(iterable = undefined) {
    super(Array, 'length', iterable)
  }
}

export class MapMap<A, B, C> extends CollectionMap<A, Map<B, C>> {
  constructor(iterable = undefined) {
    super(Map, 'size', iterable)
  }
}

export class SetMap<A, B> extends CollectionMap<A, Set<B>> {
  constructor(iterable = undefined) {
    super(Set, 'size', iterable)
  }
}
