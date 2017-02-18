# Interface-js

Exposes a way to enforce an interface on classes.

### Usage

To enforce an interface, first create a new `Interface` and pass it the function names that you want to enforce.

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
let myClass = new MyClass()
// throws a new error stating:
// 'The following function(s) need to be implemented for class MyClass: myMethodB'
```
