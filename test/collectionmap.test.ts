import { CollectionMap, MapMap, SetMap, ArrayMap } from '../src/collectionmap'

describe('test', () => {
  it('CollectionMap is instantiable', () => {
    expect(new CollectionMap(Array, 'length')).toBeInstanceOf(CollectionMap)
  })

  it('ArrayMap is instantiable', () => {
    expect(new ArrayMap()).toBeInstanceOf(ArrayMap)
  })

  it('MapMap is instantiable', () => {
    expect(new MapMap()).toBeInstanceOf(MapMap)
  })

  it('SetMap is instantiable', () => {
    expect(new SetMap()).toBeInstanceOf(SetMap)
  })

  it('should set non-empty', () => {
    const a = new SetMap()
    expect(a.has(1)).toBe(false)
    a.set(1, new Set([2]))
    expect(a.has(1)).toBe(true)
  })

  it('should remove empty', () => {
    const a = new SetMap([[1, new Set([2])]])
    expect(a.has(1)).toBe(true)
    a.set(1, new Set())
    expect(a.has(1)).toBe(false)
  })

  it('should construct ArrayMap', () => {
    const a = new ArrayMap()
    expect(a.has(1)).toBe(false)
    expect(Array.isArray(a.get(1))).toBe(true)
    expect([...a.get(1)]).toEqual([])
  })

  it('get non-existing', () => {
    const a = new SetMap()
    expect(a.has(1)).toBe(false)
    expect([...a.get(1)]).toEqual([])
  })

  it('construct', () => {
    const a = new SetMap([[1, new Set([2])]])
    expect([...a.get(1)]).toEqual([2])
  })

  it('should throw with missing values', () => {
    expect(() => new CollectionMap()).toThrow()
    expect(() => new CollectionMap(Set)).toThrow()
    expect(() => new CollectionMap('foo', 1)).toThrow()
  })
})
