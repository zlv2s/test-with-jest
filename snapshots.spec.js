const user = {
  name: 'leo',
  age: 22,
  sex: 'M'
}

test('user matches', () => {
  expect(user).toMatchSnapshot()
})