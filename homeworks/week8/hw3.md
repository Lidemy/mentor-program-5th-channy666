## 什麼是 Ajax？
 Ajax(Asynchronous JavaScript And XML): 以非同步的方式與伺服器交換資料的方法，發完 request 後就會繼續執行其他東西，不會停在那邊等 response 導致整個網頁停擺。
 
## 用 Ajax 與我們用表單送出資料的差別在哪？
表單：client 透過瀏覽器傳 request 給 server，sever 回傳 response 後瀏覽器再 render 出來。每交換一次資料就要重新讀取整個頁面。
Ajax：除了透過瀏覽器外，也利用 javascript 處理要發的 request 及 server 傳回來的 response，只處理必要的資料、只更動必要的介面與內容，不需要重新讀取整個畫面，並且可以同時發出多個 request，有 response 回來時再即時的做出反應，省時又省力。

## JSONP 是什麼？
JSONP(JSON with Padding): 利用 script 標籤不受同源政策規範的特性，透過 javascript 跨網域的存取資料。  
引入別人的 script 之後再用 callback function 去取得他的資料，雖然不會受到同源政策的限制，但也需要 server 端的配合才有辦法執行 callback function，而且可能因為別人的 script 改動而受影響。

## 要如何存取跨網域的 API？
因為同源政策 Same Origin Policy 的規範，若使用瀏覽器存取跨網域的 API，server 傳回來的 response 會被瀏覽器擋下，拿不到資料。  
若 server 端同意讓別人跨網域存取他的 API，就會在 response 的 header 帶上 `access-control-allow-origin`，寫上有哪些 domaim 可以存取 API，符合的人就可以拿到資料。
* `access-control-allow-origin: *`: 任何 Domain 都可以存取！
* 另外還有 `Access-Control-Allow-Headers` 跟 `Access-Control-Allow-Methods`，寫上 server 端接受哪些 Request Header 以及接受哪些 Method。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週是用 node.js 發 request 、取得 response，直接與 server 溝通，沒有任何的限制。  
這週是透過瀏覽器與 server 溝通，發 request 跟取得 response 都會經過瀏覽器，就需要遵守一些瀏覽器的規定，主要是基於安全性的考量，瀏覽器預設就是不給存取不同網域的 response。
