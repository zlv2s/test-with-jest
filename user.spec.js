import User from './user'

describe('User', () => {

  it('name return full names', () => {
    const user = new User({ firstname: 'leo', lastname: 'zou' })
    expect(user.name).toBe('leo zou')
  })
})

describe('expectations', () => {
  it('typeCheck', () => {
    const obj1 = {
      value: Date.now()
    }
    
    expect(13).toBe(13)
    expect([12, 13]).toStrictEqual([12, 13])
    expect(obj1).toEqual({
      value: expect.any(Number)
    })
  })
})
