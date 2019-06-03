import Model from './model'

const createModel = (data = [], options = {}) => {
  return new Model({
    ...options,
    data
  })
}

test('new works', () => {
  expect(createModel()).toBeInstanceOf(Model)
})

test('model structure', () => {
  expect(createModel()).toEqual(expect.objectContaining({
    $collections: expect.any(Array),
    $options: expect.objectContaining({
      primaryKey: 'id'
    }),
    all: expect.any(Function),
    record: expect.any(Function),
    update: expect.any(Function),
    find: expect.any(Function)
  }))
})

describe('record', () => {
  const heroes = [{ id: 1, name: 'batman' }, { name: 'spiderman' }]

  test('add data to collections', () => {
    const model = createModel()
    model.record(heroes)
    expect(model.$collections).toEqual([heroes[0], { id: expect.any(Number), name: heroes[1].name }])
  })

  test('gets called when data passed to Model', () => {
    const spy = jest.spyOn(Model.prototype, 'record')
    const model = createModel(heroes)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})

describe('all', () => {
  test('return empty model', () => {
    const model = createModel()
    expect(model.all()).toEqual([])
  })

  test('return model data', () => {
    const model = createModel([{ name: 'aa' }, { name: 'bb' }])
    expect(model.all().length).toBe(2)
  })

  test('origin data stays intact', () => {
    const model = createModel([{ name: 'aa' }])
    const data = model.all()
    data[0]['name'] = 'bb'
    expect(model.$collections[0]['name']).toEqual('aa')
  })
})

describe('find', () => {
  const heroes = [{ id: 1, name: 'batman' }, { id: 2, name: 'spiderman' }]
  test('return null if nothing matches', () => {
    const model = createModel()
    expect(model.find(1)).toEqual(null)
  })

  test('return a entry if matches', () => {
    const model = createModel(heroes)
    expect(model.find(1)).toEqual(heroes[0])
  })
})

describe('update', () => {
  const obj = [{ id: 1, name: 'aa' }]
  let model

  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(obj))
    model = createModel(dataset)
  })

  test('update an entry by id', () => {
    model.update(1, { name: 'bb' })
    expect(model.find(1).name).toBe('bb')
  })

  test('extend an entry by id', () => {
    model.update(1, { age: 222 })
    expect(model.find(1)).toEqual(expect.objectContaining({ name: 'aa', age: 222 }))
  })

  test('return false if nothing matches', () => {
    expect(model.update(2, {})).toBe(false)
  })
})

describe('customization', () => {
  test('customize the primaryKey', () => {
    const model = createModel([], {
      primaryKey: 'name'
    })
    expect(model.$options.primaryKey).toBe('name')
  })
})

describe('remove', () => {
  const heroes = [{ id: 1, name: 'aa' }, { name: 'bb' }]
  let model
  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(heroes))
    model = createModel(dataset)
  })
  test('remove object with given primaryKey', () => {
    model.remove(1)
    expect(model.$collections.length).toBe(1)
  })
})