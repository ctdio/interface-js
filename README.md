# Interface-js
[![Build Status](https://travis-ci.org/charlieduong94/interface-js.svg?branch=master)](https://travis-ci.org/charlieduong94/interface-js)
[![Coverage Status](https://coveralls.io/repos/github/charlieduong94/interface-js/badge.svg)](https://coveralls.io/github/charlieduong94/interface-js)

Exposes a way to enforce an interface on classes.

### Installation

```bash
npm install --save interface
```

### Usage

To enforce an interface, first create a new `Interface` and pass it the function names that you want to enforce.

```js
const MyInterface = Interface.create('myMethodA', 'myMethodB')
```

or alternatively

```js
const MyInterface = new Interface('myMethodA', 'myMethodB')
```

Next, just make your class extend from the interface. Make sure you call `super()` within your class's constructor.

```js
class MyClass extends MyInterface {
  constructor () {
    super()
  }

  myMethodA () {
    // ...implementation goes here
  }
}
```

Now, whenever you try to instantiate `MyClass`, the interface will be enforced.

```js
const instance = new MyClass()
// throws a new error with the message:
// 'The following function(s) need to be implemented for class MyClass: myMethodB'
```

Of course, the interface is enforced on all subclasses as well.

```js
class MySubClass extends MyClass {
  constructor () {
    super()
  }

  myMethodA () {
    // override 'myMethodA'
  }
}

const instance = new MySubClass()
// still throws an error with the message:
// 'The following function(s) need to be implemented for class MyClass: myMethodB'
```

Interfaces can be enforced for classes defined the old way too.

```js
const inherits = require('util').inherits

const MyInterface = new Interface('myMethodA', 'myMethodB', 'myMethodC')

function MyClass () {
  MyInterface.call(this)
}

inherits(MyClass, MyInterface)

MyClass.prototype.myMethodA = function () {
  // implementation
}

function MySubClass () {
  MyClass.call(this)
}

// inherit prototype of parent class
inherits(MySubClass, MyClass)

MySubClass.prototype.myMethodB = function () {
  // implementation
}

var instance = new MySubClass()
// throws an error with the message:
// 'The following function(s) need to be implemented for class MyClass: myMethodC'
```

You can also enforce that arbitrary objects match an interface by using
the `isImplementedBy` method.

```js
const MyInterface = new Interface('myMethod')

class MyClass {
  myMethod () {
    // some implementation
  }
}

class MyOtherClass {
  myOtherMethod () {
    // some implementation
  }
}

const instanceA = new MyClass()
const instanceB = new MyOtherClass()

MyInterface.isImplementedBy(instanceA) // returns true
MyInterface.isImplementedBy(instanceB) // returns false
```
