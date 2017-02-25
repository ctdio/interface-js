function createInterface () {
  // retrieved forced function names
  var functionNames = Array.prototype.slice.call(arguments)

  function Interface () {
    var constructor = this.constructor

    if (constructor === Interface) {
      // Interface is being created on it's own
      throw new Error('Cannot create an instance of Interface')
    } else {
      // assert that each of the functions are defined on the prototype
      var prototype = Object.getPrototypeOf(this)
      var unimplemented = []

      functionNames.forEach(function (functionName) {
        if (typeof prototype[functionName] !== 'function') {
          unimplemented.push(functionName)
        }
      })

      // throw error if there are unimplemented functions
      if (unimplemented.length) {
        throw new Error('The following function(s) need to be implemented for class ' +
          constructor.name + ': ' + unimplemented.join(', '))
      }
    }
  }

  return Interface
}

createInterface.create = createInterface

/**
 *
 * support old way of creating interface
 * Ex:
 *
 * const MyInterface = new Interface('...', '...')
 * or
 * const MyInterface = Interface('...', '...')
 */
module.exports = createInterface
