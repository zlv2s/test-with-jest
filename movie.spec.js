import movie from './movie'

describe('favorite movie', () => {
  let myMovie = []
  beforeEach(() => {
    myMovie = [{
      title: 'Age of Ultron',
      rate: null
    }]
  })

  test.only('can add a movie', () => {
    movie.add(myMovie, 'kungfu panda')
    expect(myMovie).toMatchSnapshot()
  })

  test('rate a movie', () => {
    movie.rate(myMovie[0], 5)
    expect(myMovie).toMatchSnapshot()
  })
})