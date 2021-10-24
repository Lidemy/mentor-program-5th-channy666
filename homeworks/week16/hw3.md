```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)

/* 輸出結果：
undefined
5
6
20
1
10
100
*/
```

1. 開始執行程式，進入 `global EC`，並初始化 `global VO`
   ```
   global EC
    global VO: {
      fn: function,
      a: undefined
    }
   ```

2. 執行程式第一行，賦值 a
   ```
   global EC
    global VO: {
      fn: function,
      a: 1
    }
   ```

3. 執行程式第十六行，進入 `fn EC`，初始化 `fn AO`
   ```
   fn EC
    fn AO: {
      fn2: function,
      a: undefined
    }
   
   global EC
    global VO: {
      fn: function,
      a: 1
    }
   ```

4. 執行程式第三行，這時 `fn AO` 裡面有 a，但是還沒有被賦值，輸出 undefined

5. 第四行賦值 a，第五行輸出 a（也就是 5），第六行 a + 1
   ```
   fn EC
    fn AO: {
      fn2: function,
      a: 6
    }
   
   global EC
    global VO: {
      fn: function,
      a: 1
    }
   ```

6. 第七行宣告變數 a，但是 `fn AO` 裡面已經有變數 a 所以忽略

7. 第八行進入 `fn2 EC`，初始化 `fn2 AO`，沒有宣告任何變數或 function，所以 `fn2 AO` 是空的
   ```
   fn2 EC
    fn2 AO: {
    }

   fn EC
    fn AO: {
      fn2: function,
      a: 6
    }
   
   global EC
    global VO: {
      fn: function,
      a: 1
    }
   ```

8. 第十一行輸出 a，`fn2 AO` 裡找不到 a，所以找到上一層 `fn AO` 的 a，輸出 6

9. 第十二行賦值 a，一樣找到 `fn AO`，a 的值變成 20

10. 第十三行賦值 b，一路往上找到 `global VO` 都還是沒有 b，所以自動宣告 b 為全域變數並賦值
   ```
   fn2 EC
    fn2 AO: {
    }

   fn EC
    fn AO: {
      fn2: function,
      a: 20
    }
   
   global EC
    global VO: {
      fn: function,
      a: 1,
      b: 100
    }
   ```

11. `fn2` 結束，`fn2 EC` 離開 stack。執行程式第九行，找到 `fn AO` 的 a，輸出 20
   ```
   fn EC
    fn AO: {
      fn2: function,
      a: 20
    }
   
   global EC
    global VO: {
      fn: function,
      a: 1,
      b: 100
    }
   ```

12. `fn` 結束，`fn EC` 離開 stack。執行程式第十七行，找到 `global VO` 裡的 a，輸出 1
   ```
   global EC
    global VO: {
      fn: function,
      a: 1,
      b: 100
    }
   ```

13. 第十八行重新賦值 a
   ```  
   global EC
    global VO: {
      fn: function,
      a: 10,
      b: 100
    }
   ```

14. 第十九行印出 a、第二十行印出 b， `global VO` 裡都有，分別印出 10、100

15. 程式結束，`global EC` 離開 stack