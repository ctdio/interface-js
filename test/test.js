var expect = require('chai').expect

var Interface = require('../index.js')
var inherits = require('util').inherits

describe('interface', function () {
  // eslint-disable-next-line no-unused-vars
  var instance
  var MyInterface

  function applyTestSuite () {
    it('should not allow an interface to be instantiated', function () {
      try {
        instance = new MyInterface()
        throw new Error('Interface was instantiated')
      } catch (err) {
        expect(err.message).to.equal('Cannot create an instance of Interface')
      }
    })

    it('should throw an error message showing all unimplemented methods', function () {
      function MyClass () {
        MyInterface.call(this)
      }

      try {
        instance = new MyClass()
        throw new Error('MyClass was able to be instantiated')
      } catch (err) {
        expect(err.message).to.equal('The following function(s) need to be implemented for class MyClass: methodA, methodB, methodC')
      }
    })

    it('should not throw an error when instantiating a class enforcing all given interfaces', function () {
      function MyClass () {
        MyInterface.call(this)
      }

      MyClass.prototype.methodA = function () {}
      MyClass.prototype.methodB = function () {}
      MyClass.prototype.methodC = function () {}

      instance = new MyClass()
    })

    it('should enforce an interface on subclasses', function () {
      function MyClass () {
        MyInterface.call(this)
      }

      MyClass.prototype.methodA = function () {}

      function MySubClass () {
        MyClass.call(this)
      }

      inherits(MySubClass, MyClass)

      try {
        instance = new MySubClass()
        throw new Error('MyClass was able to be instantiated')
      } catch (err) {
        expect(err.message).to.equal('The following function(s) need to be implemented for class MySubClass: methodB, methodC')
      }
    })

    it('should not throw an error for subclasses that implement all functions in the interface', function () {
      function MyClass () {
        MyInterface.call(this)
      }
      inherits(MyClass, MyInterface)

      MyClass.prototype.methodA = function () {}

      function MySubClass () {
        MyClass.call(this)
      }

      inherits(MySubClass, MyClass)
      MySubClass.prototype.methodB = function () {}
      MySubClass.prototype.methodC = function () {}

      function MySubSubClass () {
        MyClass.call(this)
      }

      inherits(MySubSubClass, MySubClass)
      instance = new MySubSubClass()
    })
  }

  context('using the supplied "create" method', function () {
    before(function () {
      MyInterface = Interface.create('methodA', 'methodB', 'methodC')
    })

    applyTestSuite()
  })

  context('calling the exposed function directly', function () {
    before(function () {
      MyInterface = Interface('methodA', 'methodB', 'methodC')
    })

    applyTestSuite()
  })

  context('creating a "new" interface', function () {
    before(function () {
      MyInterface = new Interface('methodA', 'methodB', 'methodC')
    })

    applyTestSuite()
  })

  describe('validate implementation without being a child of interface', function () {
    var MyInterface = new Interface('methodA')

    it('should return false for bad child', function () {
      class BadChild {}

      expect(MyInterface.isImplementedBy(new BadChild())).to.be.false
    })

    it('should return true for good child', function () {
      class GoodChild extends MyInterface {
        methodA () {
          return true
        }
      }

      expect(MyInterface.isImplementedBy(new GoodChild())).to.be.true
    })
  })
})
