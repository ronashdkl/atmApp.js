/* eslint-disable new-cap */
/* eslint-disable no-useless-escape */
export default {
  dependencies: {},
  add: function (qualifier, obj) {
    this.dependencies[qualifier] = obj
  },
  addAll: function (array) {
    array.forEach(element => {
      this.add(element.name, element)
    })
  },
  get: function (func) {
    try {
      var classRef = this.dependencies[func]
      return this.resolveDependencies(classRef)
    } catch (error) {
      console.error(func + ' is not register on service locator', error)
    }
  },
  resolveDependencies: function (func) {
    var args = this.getArguments(func)
    var obj = new func()
    for (var i = 0; i < args.length; i++) {
      if (args[i] === '') {
        break
      }
      var di = this.dependencies[args[i].trim()]
      if (typeof di === 'string') {
        obj[args[i].trim()] = di
      } else {
        obj[args[i].trim()] = new di()
      }
    }
    return obj
  },
  getArguments: function (func) {
    // This regex is from require.js
    var FN_ARGS = /\((.*?)\)/
    var args = func.toString().match(FN_ARGS)[1].split(',')
    return args
  }
}
