var expect = require('chai').expect

var Interface = require('../index.js')
var inherits = require('util').inherits

describe('interface', function () {
  it('should not allow an interface to be instantiated', function () {
    var MyInterface = new Interface('doWork', 'doMoreWork')
    try {
      var interface = new MyInterface()
      throw new Error('Interface was instantiated')
    } catch (err) {
      expect(err.message).to.equal('Cannot create an instance of Interface')
    }
  })

  it('should throw an error for a class not implementing an interface', function () {
    var MyInterface = new Interface('method');

    function MyClass () {
      MyInterface.call(this)
    }

    try {
      let instance = new MyClass()
      throw new Error('MyClass was able to be instantiated')
    } catch (err) {
      expect(err.message).to.equal('The following function(s) need to be implemented for class MyClass: method')
    }
  })

  it('should throw an error message showing all unimplemented methods', function () {
    var MyInterface = new Interface('methodA', 'methodB', 'methodC');

    function MyClass () {
      MyInterface.call(this)
    }

    try {
      let instance = new MyClass()
      throw new Error('MyClass was able to be instantiated')
    } catch (err) {
      expect(err.message).to.equal('The following function(s) need to be implemented for class MyClass: methodA, methodB, methodC')
    }
  })

  it('should not throw an error when instantiating a class enforcing all given interfaces', function () {
    var MyInterface = new Interface('methodA', 'methodB');

    function MyClass () {
      MyInterface.call(this)
      console.log('creating my class')
    }

    MyClass.prototype.methodA = function () {}
    MyClass.prototype.methodB = function () {}

    inherits(MyClass, Interface)

    let instance = new MyClass()
  })

  it('should enforce the interface on subclasses', function () {
    var MyInterface = new Interface('methodA', 'methodB');

    function MyClass () {
      MyInterface.call(this)
      console.log('creating my class')
    }

    MyClass.prototype.methodA = function () {}

    inherits(MyClass, Interface)

    function MySubClass () {
      MyClass.call(this)
    }

    inherits(MySubClass, MyClass)

    try {
      let instance = new MySubClass()
      throw new Error('MyClass was able to be instantiated')
    } catch (err) {
      expect(err.message).to.equal('The following function(s) need to be implemented for class MySubClass: methodB')
    }
  })
})
