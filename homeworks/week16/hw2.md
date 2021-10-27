```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

/* 輸出結果：
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5 
*/
```

1. 開始執行程式，`main()` 進入 stack
2. 執行程式第一行，進入 for 迴圈
3. 第一圈：i = 0
   * 輸出 i: 0
   * 執行 `setTimeout()`，JavaScript 執行環境開始計時 1000 毫秒，計時完成後將 callback function 送到 task queue
   * i + 1 = 1，i < 5，進入下一圈
4. 第二圈：i = 1
   * 輸出 i: 1
   * 執行 `setTimeout()`，JavaScript 執行環境開始計時 1000 毫秒，計時完成後將 callback function 送到 task queue
   * i + 1 = 2，i < 5，進入下一圈
5. 第三圈：i = 2
   * 輸出 i: 2
   * 執行 `setTimeout()`，JavaScript 執行環境開始計時 1000 毫秒，計時完成後將 callback function 送到 task queue
   * i + 1 = 3，i < 5，進入下一圈
6. 第四圈：i = 3
   * 輸出 i: 3
   * 執行 `setTimeout()`，JavaScript 執行環境開始計時 1000 毫秒，計時完成後將 callback function 送到 task queue
   * i + 1 = 4，i < 5，進入下一圈
7. 第五圈：i = 4
   * 輸出 i: 4
   * 執行 `setTimeout()`，JavaScript 執行環境開始計時 1000 毫秒，計時完成後將 callback function 送到 task queue
   * i + 1 = 5，i = 5，跳出迴圈
8. for 迴圈結束，程式執行完畢，`main()` pop 離開 stack，stack 空了
9. 執行環境計時 1000 毫秒結束後會把 callback function 送去 task queue 等待，當 stack 清空時， Event Loop 就會把 task queue 的第一個 task 送去 stack 執行。
10. 這邊會被執行到的是第一圈 `setTimeout()` 的 callback function，只是這時迴圈已經跑完，i = 5，所以會輸出 5
11. 第一圈的 callback function 執行完後 stack 清空，Event Loop 繼續送當下的第一個 task（第二圈的 callback function） 去 stack，這時的 i 一樣還是 5，所以也是輸出 5，然後 pop 離開 stack
12. 每一圈的 setTimeout 等待時間都是 1000 毫秒，在 task queue 就是依照順序排列，被 Event Loop 送上 stack 執行也是依照順序第一圈的 callback function 結束後 -> 第二圈的 callback function -> 第三圈的 callback function -> 第四圈的 callback function -> 第五圈的 callback function，總共五圈，依序印出五個 5
13. stack 跟 task queue 都清空，結束！