```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

三個都是要輸出 `this.value`，而 `this` 指向誰是依據如何呼叫而定，可以利用轉換成 `call()` 的呼叫方法來判斷 `this`  
1. `obj.inner.hello()` 轉換成 `call()` 就會是 `obj.inner.hello.call(obj.inner)`，`this` 即為 `obj.inner`，`this.value = 2` 輸出 2

2. `obj2.hello()` 可以轉換呼叫方式變成 `obj2.hello.call(obj2)`，`this` 即為 `obj2`，`obj2.value = 2` 輸出 2

3. `hello()` 轉換成 `hello.call()`，預設的 `this` 會是 `window`、`global`（非嚴格模式下依據執行環境而不同）或是 `undefined`（嚴格模式），而不管是上述哪一個，`this.value` 都是輸出 undefined
