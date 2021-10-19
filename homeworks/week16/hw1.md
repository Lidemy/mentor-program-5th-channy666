```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

/* 輸出結果：
1
3
5
2
4
*/
```

1. 開始執行程式，`main()` 進入 stack
2. 執行程式第一行， `console.log(1)` 進入 stack，輸出 1 之後 pop 離開 stack
3. 執行程式第二行， `setTimeout()` 進入 stack，呼叫 setTimeout 並傳入 callback function 與時間，後續就交由 browser（或是任何 JavaScript 的執行環境）處理，`setTimeout()` pop 離開 stack
   * setTimeout 是由執行環境提供的 function
   * setTimeout 被呼叫時，執行環境會依據傳入的時間參數開始計時
   * 時間到之後會將 callback function 送到 task queue 去排隊
4. 執行程式第五行， `console.log(3)` 進入 stack，輸出 3 之後 pop 離開 stack
5. 執行程式第六行，`setTimeout()` 進入 stack，呼叫 setTimeout 並傳入 callback function 與時間，後續交由 browser（或是任何 JavaScript 的執行環境）處理，`setTimeout()` pop 離開 stack
   * 前一個 `setTimeout()` 只等待了 0 毫秒就進入 task queue
   * 第二個 `setTimeout()` 一樣經過執行環境計時後，callback function 被送到 task queue 時會排在第一個 setTimeout 的 callback function 的後面
6. 執行程式第九行， `console.log(5)` 進入 stack，輸出 5 之後 pop 離開 stack
7. 程式執行完畢，`main()` pop 離開 stack
8. Event Loop 發現 stack 空了，將 task queue 的第一個 task（第一個 setTimeout 的 callback function） 送到 stack 去執行，輸出 2 之後 pop 離開 stack
9. stack 又空，Event Loop 繼續把 task queue 的 task （第二個 setTimeout 的 callback function）送過去執行，輸出 4 之後 pop 離開 stack
10. stack 跟 task queue 都空了，結束！