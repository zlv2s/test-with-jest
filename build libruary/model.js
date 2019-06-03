export default class Model {
  constructor(options = {}) {
    const data = options.data || []
    delete options.data
    this.$collections = []
    this.$options = Object.assign({ primaryKey: 'id' }, options)
    if (data.length) {
      this.record(data)
    }
  }

  all() {
    return this.$collections.map(obj => Object.assign({}, obj))
  }

  record(data) {
    const mappedData = data.map(obj => {
      if (obj[this.$options.primaryKey]) return obj
      obj[this.$options.primaryKey] = Date.now()
      return obj
    })
    this.$collections.push(...mappedData)
  }

  update(id, data) {
    const foundItemIndex = this.$collections.findIndex(obj => obj[this.$options.primaryKey] === id)
    if (foundItemIndex < 0) return false
    this.$collections[foundItemIndex] = Object.assign(this.$collections[foundItemIndex], data)
  }

  find(id) {
    const matched = this.$collections.find(obj => obj[this.$options.primaryKey] === id)
    return matched ? Object.assign({}, matched) : null
  }
  remove(id) {
    const idx = this.$collections.findIndex(obj => obj[this.$options.primaryKey] === id)
    if (idx >= 0) this.$collections.splice(idx, 1)
  }
}