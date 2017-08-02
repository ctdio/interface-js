function createInterface () {
  // retrieved forced function names
  var functionNames = Array.prototype.slice.call(arguments)

  function Interface () {
    var constructor = this.constructor

    if (constructor === Interface) {
      // Interface is being created on it's own
      throw new Error('Cannot create an instance of Interface')
    } else {
      var prototype = Object.getPrototypeOf(this)
      var unimplemented = []

      for (var i = 0; i < functionNames.length; i++) {
        if (typeof prototype[functionNames[i]] !== 'function') {
          unimplemented.push(functionNames[i])
        }
      }

      // throw error if there are unimplemented functions
      if (unimplemented.length) {
        throw new Error('The following function(s) need to be implemented for class ' +
          constructor.name + ': ' + unimplemented.join(', '))
      }
    }
  }

  // expose validate function
  Interface.isImplementedBy = function (object) {
    var prototype = Object.getPrototypeOf(object)
    var valid = true

    for (var i = 0; i < functionNames.length; i++) {
      if (typeof prototype[functionNames[i]] !== 'function') {
        valid = false
        break
      }
    }

    return valid
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
