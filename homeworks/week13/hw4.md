## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個 bundler，打包的工具。目前的瀏覽器不一定有支援一些新的語法或不同模組化的規範，webpack 透過不同的 loader 將各種資源（JavaScript、CSS、圖片等等）引入，經過轉換（編譯、壓縮、最小化等等）或搭配一些 plugin 後，再全部打包起來變成一包瀏覽器看得懂、可以執行的東西。
Webpack 就是一個幫助前端開發的方便工具，也是可以選擇使用其他的工具或不用任何工具，只要可以達到讓瀏覽器順利執行的這個目的就可以了。（也許實務上開發過程中不使用任何工具是不可能的，我猜只有網頁會動遠遠不夠，還有網頁載入的速度、開發網頁花費的時間與方便性等等很多面向需要考量...？）

## gulp 跟 webpack 有什麼不一樣？
webpack 的功用是把各種資源引入、轉換後打包的工具，gulp 則是一個做任務管理的工具。
使用 gulp 時，可以自己定義各個任務的內容與任務間的執行順序，每個任務就是一個 function，在 function 內寫好任務要做的事情，gulp 就會依照設定、透過本身的 plugin（或是使用者自己建立的 plugin） 去執行這些 function。

雖然 webpack 跟 gulp 都可以做到像是 babel、sass 與 css 轉換、minify 這些事情，但兩者本質上還是有一些差異。
webpack: 透過不同的 loader 引入各種資源後可以順便做到上述這些事情，但主要的目的還是把資源們打包成一包瀏覽器看得懂的東西。webpack loader 沒有提供的功能可能就做不到。
gulp: babel、sass 與 css 轉換、minify 這些事情都可以成為 gulp 中的一個任務，透過 gulp 的 plugin 去執行。使用者可以自訂任務的內容與執行的順序、方式，基本上任何事情都可以寫成一個 plugin，成為 gulp 中的一個任務（使用 webpack 打包也可以是一個任務）。gulp 的主要目的在於依據使用者的設定去管理、執行這些任務。

## CSS Selector 權重的計算方式為何？
在 CSS 中選擇元素可以透過元素的 id、class 以及 html 的標籤，而三者的權重也不同。若選擇到同一個元素，權重較重的會把權重輕的蓋過去，因此如何選擇元素（選擇器）將會影響 CSS 的呈現。
權重由重到輕分別為 id -> class -> html 標籤，比較的方法是先從最重的開始比，平手的話再繼續往下比。假設下述 A, B, C 皆選到同一個元素
A. `form div.btn a`: 0 個 id，1 個 class，3 個標籤
B. `#link`: 1 個 id，0 個 class，0 個標籤
C. `div div .google`: 0 個 id，1 個 class，2 個標籤
先看 id -> B 勝出。接著比 class -> 平手，繼續往下比標籤 -> C 勝出，權重即為 B > C > A

另外還有兩種影響權重的方式，分別為直接在 html 的標籤上加上 CSS 的 in-line style，以及在 CSS 的 value 後面加上 `!important`，讓該樣式變成最高權重的做法。

總結來說，CSS 的權重比較為 !important > inline style > id > class > 標籤，如果同一個元素的樣式有衝突的話就會先看看有沒有 !important，沒有的話看看是否為 inline style，也不是的話就按照 id -> class -> 標籤這樣的順序比下去。顯示的 CSS 樣式就會是權重大的那個。另外，如果兩個選擇器的權重一樣，則會採用程式碼中放在比較後面的那個選擇器的樣式。

